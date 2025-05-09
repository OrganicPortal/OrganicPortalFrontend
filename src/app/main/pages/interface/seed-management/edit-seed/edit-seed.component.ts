import {DatePipe} from "@angular/common"
import {ChangeDetectionStrategy, Component, HostBinding, TemplateRef, ViewChild} from "@angular/core"
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	filter,
	map,
	Observable,
	of,
	startWith,
	Subject,
	switchMap,
	takeUntil,
	tap,
	toArray
} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"
import {
	ConfirmedModalWindowService
} from "../../../../../../addons/components/confirmed-modal-window/confirmed-modal-window.service"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {DateTimePipe} from "../../../../../../addons/pipes/datetime.pipe"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {AuthAuditorReducerModel} from "../../../../../store/models/auth/auth.auditor.models"
import {ICompanyDTO} from "../../my-profile/my-profile.service"
import {AllowedCertModel} from "../new-seed/new-seed.component"
import {ISeedBaseDTO, SeedManagementService, SeedModelDTO} from "../seed-management.service"

@Component({
	selector: "app-edit-seed",
	standalone: false,
	templateUrl: "./edit-seed.component.html",
	styleUrls: [
		"./edit-seed.component.scss",
		"../new-seed/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [frameSideIn4]
})
export class EditSeedComponent extends LifeHooksFactory {
	public authAuditorState$: Observable<AuthAuditorReducerModel>
	public readonly loaderState$ = onInitLoader()
	public readonly seedData$ = new BehaviorSubject<ISeedBaseDTO | undefined>(undefined)
	public readonly allowedCerts$ = new BehaviorSubject<AllowedCertModel[]>([])
	public form!: FormGroup
	public isFirstContentLoaded: boolean = false
	@ViewChild("sendToCertTemplate") sendToCertTemplate!: TemplateRef<any>
	public readonly isDetectChangesInForm$ = new BehaviorSubject<boolean>(false)
	private readonly requestHandler$ = new Subject<void>()
	private readonly requestRefresher$ = new Subject<void | "refresh-edit">()
	private selectedCompanyId: number = -1
	private selectedSeedId: number = -1

	constructor(
		private _authListeners: AuthListeners,
		private _activatedRoute: ActivatedRoute,
		private _dateTimePipe: DateTimePipe,
		private _datePipe: DatePipe,
		private _confirmedModalWindowService: ConfirmedModalWindowService,
		private _router: Router,
		private _ngShortMessageService: NgShortMessageService,
		private _seedManagementService: SeedManagementService
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

		this._activatedRoute.params
			.pipe(
				switchMap((el) => {
					const seedId = el["seedId"]

					if (!seedId || !Number.isInteger(Number(seedId))) {
						const message = "Вказано хибний ідентифікатор насіння"
						this._ngShortMessageService.onInitMessage(message, "info-circle")
						return of(undefined)
					}

					return this.authAuditorState$.pipe(
						map((el2) => {
							return {
								seedId: Number(seedId),
								companyId: el2.activeCompany?.CompanyId,
								activeCompanyData: el2.activeCompany
							}
						})
					)
				}),

				filter(el => !!el),
				switchMap((el) => this.requestRefresher$.pipe(
					startWith(undefined),
					map((el2) => ({
						data: el,
						refresherState: el2
					}))
				)),

				switchMap((el) => {
					this.loaderState$.next(new LoaderModel(false, false))
					return combineLatest(
						[
							this.onGetSeedInfo(el.data.seedId, el.data.companyId ?? -1),
							this._seedManagementService.onGetAllowedCerts()
						]
					).pipe(
						map((el2) => {
							this.selectedSeedId = el.data.seedId

							return ({
								response: el2,
								auditorData: el
							})
						})
					)
				}),

				tap((el) => {
					const certs = el.response[1].Data.map((el) => new AllowedCertModel(el))

					if (Object.keys(el.response[0]).length == 0) {
						this.loaderState$.next(new LoaderModel(true, true))
						this._router.navigate(["/interface/seed-management"])
						return
					}

					this.allowedCerts$.next(certs)
					this.seedData$.next(el.response[0].Data)
					this.selectedCompanyId = el.response[0].Data.CompanyId
					this.isFirstContentLoaded = true

					this.onInitForm(el.response[0].Data, el.auditorData.data.activeCompanyData, certs)
					this.isDetectChangesInForm$.next(false)

					this.loaderState$.next(new LoaderModel(true, false))

					if (el.auditorData.refresherState === "refresh-edit") {
						const message = "Успішно відредаговано"
						this._ngShortMessageService.onInitMessage(message, "check-circle")
					}
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
				}),

				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public onChangedDropdownValue() {
		this.isDetectChangesInForm$.next(true)
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}

	public onRemoveSeedInfo() {
		const message = `Обрану одиницю продукції буде <span class="little-red-color font-bold">видалено</span>. Продовжити?`
		const obs$ = this._seedManagementService
			.onRemoveSeedFromCompany(this.selectedSeedId, this.selectedCompanyId)
			.pipe(
				tap(() => {
					const message = "Дані успішно видалено"
					this._ngShortMessageService.onInitMessage(message, "check-circle")
					this._router.navigate(["/interface/seed-management"])
				}),
				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			)

		this._confirmedModalWindowService
			.onCreateModalWindow(message)
			.pipe(
				filter(el => el.isConfirmWindow),
				tap((el) => {
					this.requestHandler$.next()
					this.loaderState$.next(new LoaderModel(false, false))
				}),
				switchMap((el) => obs$)
			).subscribe()
	}


	public onSelectionCertHandler(control: FormControl) {
		if (control.disabled)
			return

		control.setValue(!control.value)
		this.isDetectChangesInForm$.next(true)
	}

	public onSendSeedToCertification(isFormChanged: boolean | null) {
		if (!this.sendToCertTemplate)
			return

		if (isFormChanged) {
			const message = "Збережіть зміни для виконання сертифікації."
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const seedId = this.selectedSeedId
		const companyId = this.selectedCompanyId

		const obs$ = this._seedManagementService
			.onSendSeedToCertification(seedId, companyId)
			.pipe(
				tap((el) => {
					this.requestRefresher$.next()
				}),

				catchError(async () => {
					this.loaderState$.next(new LoaderModel(true, true))
				}),
				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			)

		this._confirmedModalWindowService
			.onCreateModalWindow(this.sendToCertTemplate)
			.pipe(
				filter(el => el.isConfirmWindow),
				tap(() => {
					this.requestHandler$.next()
					this.loaderState$.next(new LoaderModel(false, false))
				}),
				switchMap(() => obs$)
			).subscribe()
	}

	public onSubmit(seedData: ISeedBaseDTO, allowedCerts: AllowedCertModel[]) {
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

		const initialCertsIds = seedData.CERTsList.map(el => ({
			certId: el.CERTId,
			id: el.Id
		}))

		const filteredCerts = allowedCerts
			.map(el => {
				const certsIds = initialCertsIds.map(el => el.certId)

				// Remove certificates
				if (certsIds.includes(el.certData.Id) && !el.control.value) {
					return {
						type: "remove",
						certId: el.certData.Id,
						useCertId: initialCertsIds.find(el2 => el2.certId === el.certData.Id)?.id
					}
				}


				if (certsIds.includes(el.certData.Id))
					return

				// Add certificates
				if (el.control.value) {
					return {
						type: "add",
						certId: el.certData.Id,
						useCertId: initialCertsIds.find(el2 => el2.certId === el.certData.Id)?.id
					}
				}

				return
			}).filter(el => !!el)

		const seedId = this.selectedSeedId

		const addCerts = filteredCerts.filter(el => el?.type === "add")
			.map(el => ({Id: el?.certId!}))

		const removeCerts = filteredCerts.filter(el => el?.type === "remove")
			.map(el => ({Id: el?.useCertId!}))

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

		this.requestHandler$.next()
		this.loaderState$.next(new LoaderModel(false, false))
		this._seedManagementService
			.onSaveEditedSeedAndCertsInfo(seedId, this.selectedCompanyId, model, addCerts, removeCerts, true)
			.pipe(
				toArray(),
				tap((el) => {
					this.requestRefresher$.next("refresh-edit")
				}),
				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}


	private onGetSeedInfo(seedId: number, companyId: number) {
		return this._seedManagementService.onGetSeedInfo(seedId, companyId)
	}

	private onInitForm(seedInfo: ISeedBaseDTO, companyInfo: ICompanyDTO | undefined, allowedCerts: AllowedCertModel[]) {

		const isDisableFields = !!companyInfo?.CompanyArchivated ||
			(seedInfo.Status != 0 && seedInfo.Status != 3)

		const selectedCertsIds = seedInfo.CERTsList
			.map(el => el.CERTId)

		allowedCerts.map(el => {
			el.control.setValue(selectedCertsIds.includes(el.certData.Id))

			if (isDisableFields)
				el.control.disable()
		})

		let expiryDate = this._dateTimePipe.convertToUTCLocaleTime(seedInfo.ExpiryDate).toString()
		let harvestDate = this._dateTimePipe.convertToUTCLocaleTime(seedInfo.HarvestDate).toString()

		expiryDate = this._datePipe.transform(expiryDate, "yyyy-MM-dd HH:mm")!
		harvestDate = this._datePipe.transform(harvestDate, "yyyy-MM-dd HH:mm")!

		this.form = new FormGroup({
			Name: new FormControl({
				value: seedInfo.Name,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			ScientificName: new FormControl({
				value: seedInfo.ScientificName,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			Variety: new FormControl({
				value: seedInfo.Variety,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			SeedType: new FormControl({
				value: seedInfo.SeedType,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			BatchNumber: new FormControl({
				value: seedInfo.BatchNumber,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),

			HarvestDate: new FormControl({
				value: harvestDate,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			ExpiryDate: new FormControl({
				value: expiryDate,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),

			TreatmentType: new FormControl({
				value: seedInfo.TreatmentType,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),

			StorageConditions: new FormControl({
				value: seedInfo.StorageConditions,
				disabled: isDisableFields
			}, [Validators.required, Validators.minLength(2)]),
			AverageWeightThousandSeeds: new FormControl({
				value: seedInfo.AverageWeightThousandSeeds,
				disabled: isDisableFields
			}, [Validators.pattern(/^[+-]?(?:\d+([.,]\d+)?|[.,]\d+)$/), Validators.required]),

			Certificates: new FormArray(allowedCerts.map(el => el.control))
		})
	}
}
