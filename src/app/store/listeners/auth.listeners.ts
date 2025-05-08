import {Injectable} from "@angular/core"
import {Store} from "@ngrx/store"
import * as AuthActions from "../actions/auth.actions"

@Injectable({
	providedIn: "root"
})
export class AuthListeners {
	constructor(
		private _store: Store<AuthActions.StoreAuthType>
	) {
	}

	public get storeRegistrationState$() {
		return this._store.select(AuthActions.Actions.RegistrationReducerName)
			.pipe()
	}

	public get storeLogoutState$() {
		return this._store.select(AuthActions.Actions.LogoutReducerName)
			.pipe()
	}

	public get storePhoneConfirmationState$() {
		return this._store.select(AuthActions.Actions.PhoneCodeConfirmationReducerName)
			.pipe()
	}

	public get storeLoginState$() {
		return this._store.select(AuthActions.Actions.LoginReducerName)
			.pipe()
	}

	public get authAuditorState$() {
		return this._store.select(AuthActions.Actions.AuthAuditorReducerName)
			.pipe()
	}

	public get authPasswordRecoveryState$() {
		return this._store.select(AuthActions.Actions.RecoveryPasswordReducerName)
			.pipe()
	}

	public get fullScreenLoaderState$() {
		return this._store.select(AuthActions.Actions.FullScreenLoaderReducerName)
			.pipe()
	}
}
