import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import {RoutesRedirects} from "../../../../../addons/states/routes-redirects.service"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {StoreAuthType} from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"
import {LoginDataModel, LoginEffectData} from "../../../../store/models/auth.login.models"
import {AuthService} from "../auth.service"

@Component({
	selector: "app-login",
	standalone: false,
	templateUrl: "./login.component.html",
	styleUrls: [
		"./login.component.scss",
		"../shared/shared.styles.scss"
	],
	animations: [
		frameSideIn4
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends LifeHooksFactory {
	public loginFg = new FormGroup({
		phone: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]),
		password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
	})
	public readonly loaderState$ = onInitLoader(true, false)
	protected readonly RoutesRedirects = RoutesRedirects

	constructor(
		private _authService: AuthService,
		private _authListeners: AuthListeners,
		private _ngShortMessageService: NgShortMessageService,
		private _store: Store<StoreAuthType>
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()

		this._authListeners.storeLoginState$
			.pipe(
				tap((el) => {
					if (!!(el.isFetchSuccess && el.Data && el.isRequestComplete)) {
						this.loaderState$.next(new LoaderModel(true, false))
						return
					}

					if (el.isFetchSuccess && !el.isRequestComplete) {
						this.loaderState$.next(new LoaderModel(true, true))
						return
					}
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public onHandlerPassword(input: HTMLInputElement) {
		if (input.type === "password") {
			input.type = "text"
			return
		}

		input.type = "password"
	}

	public onSubmit() {
		if (!this.loginFg.valid) {
			this._ngShortMessageService.onInitMessage("Форму заповнено не коректно", "close-circle")
			return
		}

		const login = this.loginFg.get("phone")?.value ?? ""
		const password = this.loginFg.get("password")?.value ?? ""

		const loginData = new LoginDataModel(login, password)
		const payload = new LoginEffectData(loginData)

		this.loaderState$.next(new LoaderModel(false, false))
		this._store.dispatch(AuthActions.LoginInit(payload))
	}
}
