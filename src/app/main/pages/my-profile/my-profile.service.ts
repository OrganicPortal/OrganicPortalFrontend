import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs"
import {LoaderModel, onInitLoader} from "../../../../addons/models/models"

@Injectable({
	providedIn: "root"
})
export class MyProfileService {
	public readonly loaderState$ = onInitLoader()

	public readonly profileData$ =
		new BehaviorSubject<IMyProfileDTO | undefined>(undefined)

	public readonly profileUpdater$ = new Subject<void>()

	constructor(
		private _http: HttpClient,
		private _activatedRoute: ActivatedRoute
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



