import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {Subject, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import {RoutesRedirects} from "../../../../../addons/states/routes-redirects.service"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"
import {RegistrationModel} from "../../../../store/models/auth/auth.registration.models"

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
	protected readonly RoutesRedirects = RoutesRedirects

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _authListeners: AuthListeners,
		private _store: Store<AuthActions.StoreAuthType>
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()

		this._authListeners
			.storeRegistrationState$
			.pipe(
				tap((el) => {
					if (!el.isFetchSuccess && !el.isRequestComplete) {
						this.loaderState$.next(new LoaderModel(false, false))
						return
					}

					if (el.isFetchSuccess && el.isRequestComplete) {
						this.loaderState$.next(new LoaderModel(true, false))
						return
					}

					this.loaderState$.next(new LoaderModel(true, true))
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
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
			this.registrationForm.get("phone")!.value!,
			this.registrationForm.get("password")!.value!
		)

		this._store.dispatch({
			type: AuthActions.Actions.RegistrationInit,
			payload: user
		})
	}
}
