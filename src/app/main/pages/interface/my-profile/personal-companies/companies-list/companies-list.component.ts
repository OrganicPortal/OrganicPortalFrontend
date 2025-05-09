import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {catchError, delay, filter, map, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs"
import {frameSideIn4, frameSideInOut2} from "../../../../../../../addons/animations/shared.animations"
import {
	ConfirmedModalWindowService
} from "../../../../../../../addons/components/confirmed-modal-window/confirmed-modal-window.service"
import {
	NgShortMessageService
} from "../../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../../addons/models/models"
import {AllowedRoles} from "../../../../../../../addons/states/states"
import * as AuthActions from "../../../../../../store/actions/auth.actions"
import * as LocalStorageActions from "../../../../../../store/actions/localstorage.actions"

import {AuthListeners} from "../../../../../../store/listeners/auth.listeners"
import {AuthAuditorReducerModel} from "../../../../../../store/models/auth/auth.auditor.models"
import {ACTIVE_COMPANY_ID, UpdateOrSaveDataToStorageModel} from "../../../../../../store/models/localstorage/models"
import {MyCompaniesService} from "../../../my-companies/my-companies.service"
import {ICompanyDTO, MyProfileService} from "../../my-profile.service"
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
	public readonly authAuditorState$: Observable<AuthAuditorReducerModel>
	private readonly requestHandler$ = new Subject<void>()
	protected AllowedRoles = AllowedRoles

	constructor(
		private _myProfileService: MyProfileService,
		private _myCompaniesService: MyCompaniesService,
		private _store: Store<AuthActions.StoreAuthType>,
		private _confirmedModalWindowService: ConfirmedModalWindowService,
		private _authListeners: AuthListeners,
		private _ngShortMessageService: NgShortMessageService
	) {

		super()
		this.onReloadPage()

		this.authAuditorState$ = this._authListeners.authAuditorState$
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

	public onArchiveCompany(companyId: number, companyName: string) {
		this.requestHandler$.next()

		const message = `Компанію <span class="little-red-color font-bold">${companyName}</span> буде заархівовано. Продовжити?`
		const obs$ = this._myCompaniesService
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

		this._confirmedModalWindowService
			.onCreateModalWindow(message)
			.pipe(
				filter(el => el.isConfirmWindow),
				tap((el) => {
					this.loaderState$.next(new LoaderModel(false, false))
				}),
				switchMap((el) => obs$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onReloadPage() {
		this._myProfileService.profileUpdater$.next(this.loaderState$)
	}

	public onSetActiveCompany(company: ICompanyDTO, authAuditorState: AuthAuditorReducerModel) {
		if (!authAuditorState.activeCompany) {}

		const message = `Зробити компанію <span class="little-red-color font-bold">${company.CompanyName}</span> активною?`
		const delayTime = 1000

		const obs$ = of(true).pipe(
			delay(delayTime - 250),
			tap(() => {
				const storageData = new UpdateOrSaveDataToStorageModel(ACTIVE_COMPANY_ID, company.CompanyId)
				window.scrollTo(0, 0)

				this._store.dispatch(LocalStorageActions.UpdateOrSaveDataToStorage(storageData))
				this._store.dispatch(AuthActions.AuthAuditorSelectCompany({
					activeCompany: company
				}))
			}),

			delay(250),

			tap(() => {
				const message = "Компанію успішно обрано"
				this._ngShortMessageService.onInitMessage(message, "check-circle")
			})
		)

		this._confirmedModalWindowService
			.onCreateModalWindow(message)
			.pipe(
				filter(el => el.isConfirmWindow),
				tap(() => {
					this._store.dispatch(AuthActions.FullScreenLoaderInit({delay: delayTime}))
				}),
				switchMap((el) => obs$),
			).subscribe()
	}

	public onSortCompanies(companies: ICompanyDTO[], activeCompanyId: number) {
		let sortedArr = [...companies]
			.sort((a, b) => Number(a.CompanyArchivated) > Number(b.CompanyArchivated) ? 1 : -1)

		sortedArr = sortedArr.sort((a, b) => a.CompanyId !== activeCompanyId ? 1 : -1)

		return sortedArr
	}
}
