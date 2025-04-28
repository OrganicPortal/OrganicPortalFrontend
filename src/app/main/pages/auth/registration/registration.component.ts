import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {catchError, of, Subject, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import {AuthService, RegistrationModel} from "../auth.service"

@Component({
	selector: "app-registration",
	standalone: false,
	templateUrl: "./registration.component.html",
	styleUrls: [
		"./registration.component.scss",
		"../shared/shared.styles.scss"
	],
	animations: [
		frameSideIn4
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader(true, false)
	public registrationForm = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		lastName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		secondName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		phone: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]),
		password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
	})

	private readonly requestHandler$ = new Subject<void>()

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _authService: AuthService
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()
	}

	public onHandlerPassword(input: HTMLInputElement) {
		if (input.type === "password") {
			input.type = "text"
			return
		}

		input.type = "password"
	}

	public onSubmit() {
		if (this.registrationForm.invalid) {
			this._ngShortMessageService.onInitMessage("Форму заповнено не коректно", "close-circle")
			return
		}

		this.requestHandler$.next()
		const user = new RegistrationModel(
			this.registrationForm.get("name")!.value!,
			this.registrationForm.get("lastName")!.value!,
			this.registrationForm.get("secondName")!.value!,
			this.registrationForm.get("phone")!.value!.replace("+", ""),
			this.registrationForm.get("password")!.value!
		)

		this.loaderState$.next(new LoaderModel(false, false))
		this._authService.onRegister(user)
			.pipe(
				tap(el => {
					this.loaderState$.next(new LoaderModel(true, false))
				}),

				catchError((err) => {
					this.loaderState$.next(new LoaderModel(true, true))
					return of(err)
				}),
				takeUntil(this.componentDestroy$),
				takeUntil(this.requestHandler$)
			).subscribe()
	}
}
