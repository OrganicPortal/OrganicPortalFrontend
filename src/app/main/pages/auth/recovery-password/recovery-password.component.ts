import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {StoreAuthType} from "../../../../store/actions/auth.actions"
import {AuthService} from "../auth.service"

@Component({
	selector: "app-recovery-password",
	standalone: false,
	templateUrl: "./recovery-password.component.html",
	styleUrl: "./recovery-password.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryPasswordComponent extends LifeHooksFactory {
	constructor(
		private _store: Store<StoreAuthType>,
		private _authService: AuthService
	) {
		super()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._store.dispatch(AuthActions.RecoveryPasswordReset())
		this._authService.inputtedPhoneForRecovery = ""
	}
}
