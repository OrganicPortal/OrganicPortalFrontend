import {DatePipe} from "@angular/common"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {catchError, Subject, takeUntil, tap} from "rxjs"
import {frameSideInOut2, frameSideInOut4} from "../../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {ContactItemModel, CreateCompanyModelDTO, MyCompaniesService} from "../../../my-companies/my-companies.service"
import {MyProfileService} from "../../my-profile.service"
import {PersonalCompaniesService} from "../personal-companies.service"

@Component({
	selector: "app-create-company",
	standalone: false,
	templateUrl: "./create-company.component.html",
	styleUrls: [
		"./create-company.component.scss",
		"./shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideInOut2,
		frameSideInOut4
	]
})
export class CreateCompanyComponent extends LifeHooksFactory {
	public loaderState$ = onInitLoader(true)
	public form: FormGroup
	private readonly requestHandler$: Subject<void> = new Subject()


	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _myCompaniesService: MyCompaniesService,
		private _myProfileService: MyProfileService,
		private _datePipe: DatePipe,
		private _personalCompaniesService: PersonalCompaniesService,
		private _router: Router
	) {
		super()
		const arrayControls = this.typeOfInteractivityValues.map((el, idx) => el.control)

		this.form = new FormGroup({
			// Назва
			Name: new FormControl("", [Validators.required, Validators.minLength(2)]),
			// Номер в державному реєстрі
			RegistrationNumber: new FormControl("", [Validators.required, Validators.minLength(2)]),
			// Дата заснування компанії
			EstablishmentDate: new FormControl(" ", [Validators.required, Validators.minLength(2)]),

			// Опис
			Description: new FormControl("", [Validators.required, Validators.minLength(2)]),
			// Адреса установи
			Address: new FormControl("", [Validators.required, Validators.minLength(2)]),

			// Юридичний статус компанії
			LegalType: new FormControl("", [Validators.required, Validators.minLength(2)]),
			// Види діяльності
			TypeOfInteractivityList: new FormArray(arrayControls),
			// Контактні дані компанії
			ContactList: new FormArray([
				new FormGroup({
					Type: new FormControl(1, [Validators.required]),
					Contact: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)])
				})
			])
		})
	}

	protected get legalTypeList() {
		return this._personalCompaniesService.legalTypeList
	}

	protected get allowedContactTypes() {
		return this._personalCompaniesService.allowedContactTypes
	}

	protected get typeOfInteractivityValues() {
		return this._personalCompaniesService.typeOfInteractivityValues
	}

	public override ngOnInit() {
		super.ngOnInit()
		this._myProfileService.loaderState$.next(new LoaderModel(true, false))
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

	public onSubmit() {
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

		const model = new CreateCompanyModelDTO(
			this.form.get("Name")?.value ?? "",
			this.form.get("Description")?.value ?? "",
			this.form.get("RegistrationNumber")?.value ?? "",
			this.form.get("Address")?.value ?? "",
			this.form.get("LegalType")?.value ?? -1,
			this.form.get("EstablishmentDate")?.value ?? "",
			contactList,
			interactivityList
		)

		this.loaderState$.next(new LoaderModel(false, false))
		this.requestHandler$.next()
		this._myCompaniesService.onCreateCompany(model)
			.pipe(
				tap((el) => {
					const redirectUrl = "/my-profile/personal-companies/"
					this.loaderState$.next(new LoaderModel(true, false))
					this._router.navigate([redirectUrl])
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
				}),

				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}
}

export class TypeOfInteractivityModel {
	Id?: number
	name: string
	value: number
	control: FormControl = new FormControl(null)

	constructor(name: string, value: number) {
		this.name = name
		this.value = value
	}
}
