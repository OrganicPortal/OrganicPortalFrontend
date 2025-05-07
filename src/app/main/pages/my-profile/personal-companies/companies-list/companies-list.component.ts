import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {catchError, map, of, Subject, switchMap, takeUntil, tap} from "rxjs"
import {frameSideIn4, frameSideInOut2} from "../../../../../../addons/animations/shared.animations"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {AllowedRoles} from "../../../../../../addons/states/states"
import {MyCompaniesService} from "../../../my-companies/my-companies.service"
import {MyProfileService} from "../../my-profile.service"
import {containerAnimation} from "../../shared/shared.animation"

@Component({
	selector: "app-companies-list",
	standalone: false,
	templateUrl: "./companies-list.component.html",
	styleUrl: "./companies-list.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4,
		frameSideInOut2,
		containerAnimation
	]
})
export class CompaniesListComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader()
	private readonly requestHandler$ = new Subject<void>()
	protected readonly AllowedRoles = AllowedRoles

	constructor(
		private _myProfileService: MyProfileService,
		private _myCompaniesService: MyCompaniesService
	) {
		super()
		this.onReloadPage()
	}

	public get profileData$() {
		return this._myProfileService.profileData$
	}

	public get companies$() {
		return this.profileData$.pipe(
			map(el => el?.Data.CompanyList)
		)
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
	}

	public onArchiveCompany(companyId: number) {
		this.requestHandler$.next()
		this.loaderState$.next(new LoaderModel(false, false))

		this._myCompaniesService
			.onArchiveCompany(companyId)
			.pipe(
				switchMap((el) => this._myProfileService.onGetProfileInfo().pipe(
					tap((el) => {
						this.loaderState$.next(new LoaderModel(true, false))
						this._myProfileService.profileData$.next(el)
					}),

					catchError(async (el) => {
						this.loaderState$.next(new LoaderModel(true, true))
						return of(undefined)
					})
				)),

				takeUntil(this.componentDestroy$),
				takeUntil(this.requestHandler$)
			)
			.subscribe()
	}

	public onReloadPage() {
		this._myProfileService.profileUpdater$.next(this.loaderState$)
	}
}
