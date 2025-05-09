import {Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, catchError, map, startWith, Subject, switchMap, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {IAllowedCertsDTO, SeedManagementService, SeedModelDTO} from "../seed-management.service"

@Component({
	selector: "app-new-seed",
	standalone: false,
	templateUrl: "./new-seed.component.html",
	styleUrls: [
		"./new-seed.component.scss",
		"./shared.styles.scss"
	],
	providers: [
		SeedManagementService
	],
	animations: [
		frameSideIn4
	]
})
export class NewSeedComponent extends LifeHooksFactory {
	public form!: FormGroup
	public readonly loaderState$ = onInitLoader()
	public readonly allowedCerts$ = new BehaviorSubject<AllowedCertModel[]>([])
	public authAuditorState$
	public isFirstContentLoaded: boolean = false
	private readonly requestHandler$ = new Subject<void>()
	private readonly requestRefresher$ = new Subject<void>()
	private selectedCompanyId: number = -1

	constructor(
		private _authListeners: AuthListeners,
		private _seedManagementService: SeedManagementService,
		private _ngShortMessageService: NgShortMessageService,
		private _router: Router
	) {
		super()
		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	public get allowedTreatmentTypes() {
		return this._seedManagementService.allowedTreatmentTypes
	}

	@HostBinding("@frameSideIn4")
	public override ngOnInit() {
		super.ngOnInit()

		this.authAuditorState$.pipe(
			tap((el) => {
				if (el.activeCompany?.CompanyArchivated) {
					this._router.navigate(["/interface/seed-management"])
					return
				}
			}),
			map(el => el.activeCompany?.CompanyId),
			tap((el) => {
				this.selectedCompanyId = el ?? -1
			}),
			takeUntil(this.componentDestroy$)
		).subscribe()

		this.requestRefresher$.pipe(
			startWith(undefined),
			switchMap(() => this.onGetAllowedCerts()),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}

	public onSelectionCertHandler(control: FormControl) {
		control.setValue(!control.value)
	}

	public onSubmit(allowedCerts: AllowedCertModel[]) {
		if (!this.form.valid) {
			const message = "Форму заповнено не коректно"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const selectedCerts = allowedCerts.filter(el => !!el.control.value)

		if (selectedCerts.length === 0) {
			const message = "Виберіть щонайменше один сертифікат"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const model = new SeedModelDTO(
			this.form.get("Name")?.value ?? "",
			this.form.get("ScientificName")?.value ?? "",
			this.form.get("Variety")?.value ?? "",
			this.form.get("SeedType")?.value ?? "",
			this.form.get("BatchNumber")?.value ?? "",
			new Date(this.form.get("HarvestDate")?.value!),
			new Date(this.form.get("ExpiryDate")?.value!),
			this.form.get("StorageConditions")?.value ?? "",
			this.form.get("TreatmentType")?.value ?? -1,
			this.form.get("AverageWeightThousandSeeds")?.value ?? ""
		)

		this.loaderState$.next(new LoaderModel(false, false))
		this.requestHandler$.next()

		this._seedManagementService
			.onSaveSeedAndCertsInfo(
				this.selectedCompanyId,
				model,
				selectedCerts.map(el => el.certData)
			)
			.pipe(
				tap((el) => {
					const redirectTo = `/interface/seed-management/edit/${el.Data.SeedId}`
					this._router.navigate([redirectTo])

					this.loaderState$.next(new LoaderModel(true, false))
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
				}),

				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	private onGetAllowedCerts() {
		this.loaderState$.next(new LoaderModel(false, false))
		return this._seedManagementService.onGetAllowedCerts()
			.pipe(
				tap((el) => {
					this.onInitForm(el.Data)
					this.isFirstContentLoaded = true
					this.loaderState$.next(new LoaderModel(true, false))
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
				})
			)
	}

	private onInitForm(allowedCerts: IAllowedCertsDTO[]) {
		const certs = allowedCerts.map((el) => new AllowedCertModel(el))
		this.allowedCerts$.next(certs)

		this.form = new FormGroup({
			Name: new FormControl("", [Validators.required, Validators.minLength(2)]),
			ScientificName: new FormControl("", [Validators.required, Validators.minLength(2)]),
			Variety: new FormControl("", [Validators.required, Validators.minLength(2)]),
			SeedType: new FormControl("", [Validators.required, Validators.minLength(2)]),
			BatchNumber: new FormControl("", [Validators.required, Validators.minLength(2)]),

			HarvestDate: new FormControl(" ", [Validators.required, Validators.minLength(2)]),
			ExpiryDate: new FormControl(" ", [Validators.required, Validators.minLength(2)]),

			TreatmentType: new FormControl(0, [Validators.required, Validators.minLength(2)]),

			StorageConditions: new FormControl("", [Validators.required, Validators.minLength(2)]),
			AverageWeightThousandSeeds: new FormControl("", [Validators.pattern(/^[+-]?(?:\d+([.,]\d+)?|[.,]\d+)$/), Validators.required])
		})
	}

}

export class AllowedCertModel {
	certData: IAllowedCertsDTO
	control: FormControl = new FormControl()

	constructor(certData: IAllowedCertsDTO) {
		this.certData = certData
	}
}
