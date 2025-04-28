import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
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
		password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])
	})

	constructor(
		private _authService: AuthService
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

	public onSubmit() {
		if (!this.loginFg.valid) {
			return
		}

		// this._authService.onLogin(new LoginModel("123123", "123123dfF@"))
		// 	.subscribe()
	}
}
