import {Injectable} from "@angular/core"
import {Store} from "@ngrx/store"
import * as LocalStoreActions from "../actions/localstorage.actions"
import {LocalStorageOperations, LocalStorageState} from "../actions/localstorage.actions"

@Injectable({
	providedIn: "root"
})
export class LocalStorageListeners {
	constructor(
		private _store: Store<LocalStorageOperations & LocalStorageState>
	) {
	}

	public get localStorageState$() {
		return this._store.select(LocalStoreActions.Actions.StorageStateReducerName)
			.pipe()
	}

	public get localStorageOperationsState$() {
		return this._store.select(LocalStoreActions.Actions.LocalStorageOperationsReducerName)
			.pipe()
	}
}
