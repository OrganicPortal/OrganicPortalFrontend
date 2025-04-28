import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {catchError, of, Subject, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import {AuthService, LoginModel} from "../auth.service"

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
	private readonly requestHandler$ = new Subject<void>()

	constructor(
		private _authService: AuthService,
		private _ngShortMessageService: NgShortMessageService
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()
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

		const login = new LoginModel(
			this.loginFg.get("phone")!.value!,
			this.loginFg.get("password")!.value!
		)

		this.loaderState$.next(new LoaderModel(false, false))
		this.requestHandler$.next()

		this._authService.onLogin(login)
			.pipe(
				tap(() => {
					this.loaderState$.next(new LoaderModel(true, false))
				}),
				catchError((err) => {
					this.loaderState$.next(new LoaderModel(true, true))
					return of(err)
				}),
				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}
}
