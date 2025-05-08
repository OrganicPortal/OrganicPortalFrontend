import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {Store} from "@ngrx/store"
import {BehaviorSubject, catchError, delay, iif, map, Observable, of, Subject, switchMap, take, tap} from "rxjs"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"

@Injectable({
	providedIn: "root"
})
export class MyProfileService {
	public loaderState$ = onInitLoader()

	public readonly profileData$ =
		new BehaviorSubject<IMyProfileDTO | undefined>(undefined)

	public readonly profileUpdater$ = new Subject<BehaviorSubject<LoaderModel>>()

	constructor(
		private _http: HttpClient,
		private _store: Store<AuthActions.StoreAuthType>,
		private _authListeners: AuthListeners
	) {
	}

	public onGetProfileHandler() {
		return this.profileUpdater$.pipe(
			tap((el) => {
				el.next(new LoaderModel(false, false))
			}),
			switchMap((el) => {
				return this._authListeners.authAuditorState$.pipe(
					take(1),
					map(el2 => {
						return {
							loader: el,
							authState: el2
						}
					})
				)
			}),

			switchMap((item) => this.onGetProfileInfo().pipe(
				map((el) => {
					const delayTime = 1000
					const isAutoSetCompany = !item.authState.activeCompany && el.Data.CompanyList.length == 1

					const a$ = of(true)
						.pipe(
							delay(delayTime - 250),
							tap(() => {
								this._store.dispatch(AuthActions.AuthAuditorSelectCompany({
									activeCompany: el.Data.CompanyList[0]
								}))

								item.loader.next(new LoaderModel(true, false))
								this.profileData$.next(el)
							})
						)

					if (isAutoSetCompany) {
						this._store.dispatch(AuthActions.FullScreenLoaderInit({
							delay: delayTime
						}))
					} else {
						item.loader.next(new LoaderModel(true, false))
						this.profileData$.next(el)
					}

					return iif(() => isAutoSetCompany, a$, of(true))
				}),

				switchMap((el) => el),

				catchError(async (el) => {
					item.loader.next(new LoaderModel(true, true))
					return of(undefined)
				})
			))
		)
	}

	public onGetProfileInfo(): Observable<IMyProfileDTO> {
		const apiUrl = "/api/users/my-profile"
		return this._http.get<IMyProfileDTO>(apiUrl)
	}

	public onUpdateProfileInfo(payload: UpdateUserProfileDTO) {
		const apiUrl = "/api/users/my-profiles/edits"
		return this._http.patch(apiUrl, payload)
	}
}

export class UpdateUserProfileDTO {
	UserId: number
	FirstName: string
	LastName: string
	MiddleName: string


	constructor(UserId: number, FirstName: string, LastName: string, MiddleName: string) {
		this.UserId = UserId
		this.FirstName = FirstName
		this.LastName = LastName
		this.MiddleName = MiddleName
	}
}

export interface IMyProfileDTO {
	Data: {
		Id: number

		CompanyList: ICompanyDTO[]
		CreatedDate: string

		FirstName: string
		LastName: string
		MiddleName: string

		Phone: string
	}
}

export interface ICompanyDTO {
	CompanyArchivated: boolean
	CompanyId: number
	CompanyName: string
	CreatedDate: string
	Role: number
}

