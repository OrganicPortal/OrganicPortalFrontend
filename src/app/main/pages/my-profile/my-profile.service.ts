import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs"
import {LoaderModel, onInitLoader} from "../../../../addons/models/models"

@Injectable({
	providedIn: "root"
})
export class MyProfileService {
	public loaderState$ = onInitLoader()

	public readonly profileData$ =
		new BehaviorSubject<IMyProfileDTO | undefined>(undefined)

	public readonly profileUpdater$ = new Subject<void>()

	constructor(
		private _http: HttpClient
	) {
	}

	public onGetProfileHandler() {
		return this.profileUpdater$.pipe(
			map(() => {
				this.loaderState$.next(new LoaderModel(false, false))
			}),

			switchMap(() => this.onGetProfileInfo().pipe(
				tap((el) => {
					this.loaderState$.next(new LoaderModel(true, false))
					this.profileData$.next(el)
				}),

				catchError(async (el) => {
					this.loaderState$.next(new LoaderModel(true, true))
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

		CompanyList: any[]
		CreatedDate: string

		FirstName: string
		LastName: string
		MiddleName: string

		Phone: string
	}
}



