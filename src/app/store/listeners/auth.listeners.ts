import {Injectable} from "@angular/core"
import {Store} from "@ngrx/store"
import {shareReplay} from "rxjs"
import * as AuthActions from "../actions/auth.actions"

@Injectable({
	providedIn: "root"
})
export class AuthListeners {
	constructor(
		private _store: Store<AuthActions.StoreAuthType>
	) {
	}

	public get storeRegistrationState$(){
		return this._store.select(AuthActions.Actions.RegistrationReducerName)
			.pipe(shareReplay())
	}

	public get storePhoneConfirmationState$(){
		return this._store.select(AuthActions.Actions.PhoneCodeConfirmationReducerName)
			.pipe(shareReplay())
	}

	public get storeLoginState$(){
		return this._store.select(AuthActions.Actions.LoginReducerName)
			.pipe(shareReplay())
	}

	public get authAuditorState$(){
		return this._store.select(AuthActions.Actions.AuthAuditorReducerName)
			.pipe(shareReplay())
	}
}
