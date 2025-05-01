import {Component} from "@angular/core"
import {RouterOutlet} from "@angular/router"
import {NgxToastrModule} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {NgShortMessageModule} from "../addons/components/ng-materials/ng-short-message/ng-short-message.module"
import {ViewportOverlayModule} from "../addons/components/viewport-overlay/viewport-overlay.module"
import * as AuthActions from "./store/actions/auth.actions"
import {StoreAuthType} from "./store/actions/auth.actions"
import * as LocalStorageActions from "./store/actions/localstorage.actions"
import {LOCAL_STORAGE_TOKEN_KEY, SyncStorageModel} from "./store/models/localstorage/models"

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		NgxToastrModule,
		ViewportOverlayModule,
		NgShortMessageModule
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: []
})
export class AppComponent {
	constructor(
		private _store: Store<LocalStorageActions.LocalStorageOperations & StoreAuthType>
	) {
		this._store.dispatch(LocalStorageActions.SyncStorageByKeys(new SyncStorageModel([LOCAL_STORAGE_TOKEN_KEY])))
		this._store.dispatch(LocalStorageActions.StorageStateFetchInit())
		this._store.dispatch(AuthActions.AuthAuditorInit())
	}
}
