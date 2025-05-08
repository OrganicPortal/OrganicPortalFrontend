import {DatePipe} from "@angular/common"
import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, catchError, filter, map, of, Subject, switchMap, takeUntil, tap} from "rxjs"
import {frameSideInOut2, frameSideInOut4} from "../../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {DateTimeService} from "../../../../../../addons/pipes/datetime.pipe"
import {
	ContactItemModel,
	EditCompanyBasicInfoModel,
	IGetCompanyDTO,
	MyCompaniesService
} from "../../../my-companies/my-companies.service"
import {MyProfileService} from "../../my-profile.service"
import {containerAnimation} from "../../shared/shared.animation"
import {TypeOfInteractivityModel} from "../create-company/create-company.component"
import {PersonalCompaniesService} from "../personal-companies.service"

@Component({
	selector: "app-edit-company",
	templateUrl: "./edit-company.component.html",
	styleUrls: [
		"./edit-company.component.scss",
		"../create-company/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: [frameSideInOut2, frameSideInOut4, containerAnimation],
	providers: [PersonalCompaniesService]
})
export class EditCompanyComponent extends LifeHooksFactory {
	public form!: FormGroup

	public readonly loaderState$ = onInitLoader()
	public readonly updateContentLoaderState$ = onInitLoader(true, false)

	public readonly companyData$ = new BehaviorSubject<IGetCompanyDTO["Data"] | undefined>(undefined)
	public readonly typeOfInteractivityValues: TypeOfInteractivityModel[] = [
		new TypeOfInteractivityModel(
			"Виробництво та пакування насіння",
			0
		),

		new TypeOfInteractivityModel(
			"Дистрибуція та оптовий продаж насіння",
			1
		),

		new TypeOfInteractivityModel(
			"Роздрібна торгівля насінням, добривами, засобами захисту рослин (ЗЗР), тощо",
			2
		),

		new TypeOfInteractivityModel(
			"Селекція та виведення нових сортів",
			3
		),

		new TypeOfInteractivityModel(
			"Імпорт та експорт насіння або супутніх товарів",
			4
		)
	]
	private readonly activeCompanyId$
		= new BehaviorSubject<number | undefined>(undefined)
	private readonly refreshHandler$
		= new Subject<void>()

	constructor(
		private _myCompaniesService: MyCompaniesService,
		private _myProfileService: MyProfileService,
		private _personalCompaniesService: PersonalCompaniesService,
		private _datePipe: DatePipe,
		private _activatedRoute: ActivatedRoute,
		private _ngShortMessageService: NgShortMessageService,
		private _dateTimeService: DateTimeService
	) {
		super()
	}

	public get isValidCompanyId$() {
		return this._activatedRoute.params
			.pipe(
				map((el) => {
					const companyId = el?.["companyId"]
					return Number.isInteger(Number(companyId))
				})
			)
	}

	protected get legalTypeList() {
		return this._personalCompaniesService.legalTypeList
	}

	protected get allowedContactTypes() {
		return this._personalCompaniesService.allowedContactTypes
	}

	@HostBinding("@containerAnimation")
	public override ngOnInit() {
		super.ngOnInit()

		this.refreshHandler$.pipe(
			switchMap((el) => this.activeCompanyId$),
			filter(el => !!el),
			switchMap((el) => {
				if (!this.companyData$.getValue())
					this.loaderState$.next(new LoaderModel(false, false))
				return this.onGetCompanyObservable(el!)
			}),
			filter(el => !!el),
			tap(el => {
				this.companyData$.next(el.Data)
			}),
			takeUntil(this.componentDestroy$)
		).subscribe()

		this._activatedRoute.params
			.pipe(
				tap(el => {
					const companyId = el?.["companyId"]

					if (!Number.isInteger(Number(companyId))) {
						const message = "Введено невірний ідентифікатор компанії"
						this._ngShortMessageService.onInitMessage(message, "close-circle")
						return
					}

					this.activeCompanyId$.next(Number(companyId))
					this.refreshHandler$.next()
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._myProfileService.profileData$.next(undefined)
	}

	public onAddContactToForm() {
		const contact = new FormGroup({
			Type: new FormControl("", [Validators.required]),
			Contact: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)])
		})

		const formArr = (this.form.get("ContactList") as FormArray)

		formArr.push(contact)
		formArr.updateValueAndValidity()
	}

	public onGetContactListControls() {
		return (this.form.get("ContactList") as FormArray).controls as FormGroup[]
	}

	public onGetFormControlByName(formGroup: FormGroup, controlName: string) {
		return formGroup.get(controlName) as FormControl
	}

	public onGoToBack() {
		window.history.back()
	}

	public onRefreshData() {
		this.refreshHandler$.next()
	}

	public onRemoveContactFromForm(idx: number) {
		const formArr = (this.form.get("ContactList") as FormArray)

		if (formArr.length == 1) {
			const message = "Вкажіть принаймні одну контактну особу"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		formArr.removeAt(idx)
	}

	public onSelectInteractivity(item: TypeOfInteractivityModel) {
		const currValue = item.control.value
		item.control.setValue(!currValue)
	}

	public onSubmit(companyId: number) {
		if (!this.form.valid) {
			const message = "Форму заповнено не коректно"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const contactFg = this.form.get("ContactList") as FormArray<FormGroup>

		const contactList = contactFg.controls.map((el: FormGroup) => {
			const type = el.controls?.["Type"].value ?? -1
			const contact = el.controls?.["Contact"].value ?? ""

			return new ContactItemModel(type, contact)
		})

		const interactivityList = this.typeOfInteractivityValues
			.filter(el => el.control.value === true)
			.map(el => el.value)

		const model = new EditCompanyBasicInfoModel(
			this.form.get("Name")?.value ?? "",
			this.form.get("Description")?.value ?? "",
			this.form.get("Address")?.value ?? "",
			this.form.get("LegalType")?.value ?? -1,
			this.form.get("EstablishmentDate")?.value ?? "",
			contactList,
			interactivityList
		)

		this.updateContentLoaderState$.next(new LoaderModel(false, false))
		this._myCompaniesService.onEditCompanyBasicInfo(companyId, model)
			.pipe(
				tap((el) => {
					this.onUpdateFormData(el.Data)
					this.updateContentLoaderState$.next(new LoaderModel(true, false))
				}),

				catchError(async (err) => {
					this.updateContentLoaderState$.next(new LoaderModel(true, true))
					return of(err)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	private onGetCompanyObservable(companyId: number) {
		return this._myCompaniesService
			.onGetCompanyInfoById(companyId)
			.pipe(
				tap((el) => {
					this.onInitForm(el.Data)
					this.loaderState$.next(new LoaderModel(true, false))
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
					return
				}),

				takeUntil(this.componentDestroy$)
			)
	}

	private onInitForm(data: IGetCompanyDTO["Data"] | undefined) {
		const contacts = (data?.ContactList ?? []).map(el => {
			return new FormGroup({
				Type: new FormControl({value: el.Type, disabled: !!data?.isArchivated}, [Validators.required]),
				Contact: new FormControl({
					value: el.Contact,
					disabled: !!data?.isArchivated
				}, [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)])
			})
		})

		const typeOfInteractivityControls = (data?.TypeOfActivityList ?? [])
			.map(el => {
				const interactivity = this.typeOfInteractivityValues
					.find(el2 => el2.value === el.Type)

				if (!interactivity)
					return

				interactivity.control.setValue(el.Type)
				interactivity.Id = el.Id

				if (!!data?.isArchivated)
					interactivity.control.disable()

				return {
					control: interactivity.control,
					interactivity: interactivity
				}
			})
			.filter(el => !!el)
			.map(el => {
				el?.control?.setValue(true)
				return el
			})

		let _establishmentDate = " "
		if (data?.EstablishmentDate) {
			const establishmentDate = this._dateTimeService.convertToUTC0Time(data.EstablishmentDate)
			_establishmentDate = this._datePipe.transform(establishmentDate, "yyyy-MM-dd")!
		}

		this.form = new FormGroup({
			// Назва
			Name: new FormControl(
				{
					value: data?.Name,
					disabled: !!data?.isArchivated
				},
				[Validators.required, Validators.minLength(2)]
			),
			// Номер в державному реєстрі
			RegistrationNumber: new FormControl({
				value: data?.RegistrationNumber,
				disabled: true
			}, []),
			// Дата заснування компанії
			EstablishmentDate: new FormControl({
				value: _establishmentDate,
				disabled: !!data?.isArchivated
			}, [Validators.required, Validators.minLength(2)]),

			// Опис
			Description: new FormControl({
				value: data?.Description,
				disabled: !!data?.isArchivated
			}, [Validators.required, Validators.minLength(2)]),
			// Адреса установи
			Address: new FormControl({
				value: data?.Address,
				disabled: !!data?.isArchivated
			}, [Validators.required, Validators.minLength(2)]),

			// Юридичний статус компанії
			LegalType: new FormControl({
				value: data?.LegalType,
				disabled: !!data?.isArchivated
			}, [Validators.required, Validators.minLength(2)]),
			// // Види діяльності
			TypeOfInteractivityList: new FormArray(typeOfInteractivityControls.map(el => el?.control)),
			// Контактні дані компанії
			ContactList: new FormArray(contacts)
		})
	}

	private onUpdateFormData(data: IGetCompanyDTO["Data"]) {
		const contacts = (data?.ContactList ?? []).map(el => {
			return new FormGroup({
				Type: new FormControl(el.Type, [Validators.required]),
				Contact: new FormControl(el.Contact, [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)])
			})
		})

		const typeOfInteractivityControls = (data?.TypeOfActivityList ?? [])
			.map(el => {
				const interactivity = this.typeOfInteractivityValues
					.find(el2 => el2.value === el.Type)

				if (!interactivity)
					return

				interactivity.control.setValue(el.Type)
				interactivity.Id = el.Id

				return {
					control: interactivity.control,
					interactivity: interactivity
				}
			})
			.filter(el => !!el)
			.map(el => {
				el?.control?.setValue(true)
				return el
			})

		let _establishmentDate = " "
		if (data?.EstablishmentDate) {
			const establishmentDate = this._dateTimeService.convertToUTC0Time(data.EstablishmentDate)
			_establishmentDate = this._datePipe.transform(establishmentDate, "yyyy-MM-dd")!
		}

		this.form.get("Name")?.setValue(data.Name)
		this.form.get("EstablishmentDate")?.setValue(_establishmentDate)
		this.form.get("Description")?.setValue(data.Description)
		this.form.get("Address")?.setValue(data.Address)
		this.form.get("LegalType")?.setValue(data.LegalType)

		this.form.setControl("TypeOfInteractivityList", new FormArray(typeOfInteractivityControls.map(el => el?.control)))
		this.form.setControl("ContactList", new FormArray(contacts))
		this.form.updateValueAndValidity()
	}
}
