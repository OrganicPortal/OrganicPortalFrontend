import {inject, Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {Store} from "@ngrx/store"
import {exhaustMap, filter, fromEvent, map, tap} from "rxjs"
import {
	LocalStorageModel,
	RemoveFromStorageModel,
	StorageOperationsStatuses,
	SyncStorageModel,
	UpdateOrSaveDataToStorageModel
} from "../models/localstorage/models"
import * as LocalStorageActions from "./../actions/localstorage.actions"

@Injectable({
	providedIn: "root"
})
export class LocalStorageEffects {
	private readonly actions$ = inject(Actions)

	private readonly saveOrUpdateEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocalStorageActions.UpdateOrSaveDataToStorage),
			map((el) => this.saveOrUpdate(el))
		)
	)

	private readonly clearStorageEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocalStorageActions.Actions.ClearStorage),
			map(() => this.onClearStorage())
		)
	)

	private readonly storageStateEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocalStorageActions.Actions.StorageStateInitFetch),
			map(() => this.onFetchStorageState())
		)
	)

	private readonly removeFromStorageEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocalStorageActions.Actions.RemoveFromStorage),
			map((el) => this.onRemoveFromStorage(el))
		)
	)

	private readonly syncStorageKeysEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocalStorageActions.Actions.SyncStorageByKeys),
			exhaustMap((el) => this.onSyncStorageChanges(el))
		)
	)

	constructor(
		private _store: Store<LocalStorageActions.LocalStorageOperations>
	) {
	}

	private onClearStorage() {
		try {
			localStorage.clear()
			return LocalStorageActions.StorageOperationSuccessfully({status: StorageOperationsStatuses.success})
		} catch (e) {
			return LocalStorageActions.StorageOperationFailure({status: StorageOperationsStatuses.failure})
		}
	}

	private onFetchStorageState() {
		const items = new LocalStorageModel()

		Object.keys(items)
			.map(el => {
				try {
					const keyState = localStorage.getItem(el)
					const key = el as any
					const _items = items as any
					_items[key] = keyState ? JSON.parse(keyState) : keyState
				} catch {
					this._store.dispatch(LocalStorageActions
						.RemoveFromStorage(new RemoveFromStorageModel(el)))
				}
			})

		return LocalStorageActions.StorageStateAggregator({
			...items,
			isSuccessParse: true
		})
	}

	private onRemoveFromStorage(payload: RemoveFromStorageModel) {
		try {
			localStorage.removeItem(payload.key)
			return LocalStorageActions.StorageOperationSuccessfully({status: StorageOperationsStatuses.success})
		} catch (e) {
			return LocalStorageActions.StorageOperationFailure({status: StorageOperationsStatuses.failure})
		}
	}

	private onSyncStorageChanges(payload: SyncStorageModel) {
		return fromEvent<StorageEvent>(window, "storage")
			.pipe(
				tap(() => {
					console.log(payload)

				}),

				filter(ev => ev.storageArea == localStorage),
				filter(ev => payload.keys.includes(ev.key ?? "")),
				filter(el => el.oldValue != el.newValue),
				map(() => {
					window.location.reload()
					return LocalStorageActions.StorageOperationSuccessfully({
							status: StorageOperationsStatuses.success
						}
					)
				})
			)
	}

	private saveOrUpdate(payload: UpdateOrSaveDataToStorageModel) {
		try {
			const serializedValue = JSON.stringify(payload.value)
			localStorage.setItem(payload.key, serializedValue)
			return LocalStorageActions.StorageOperationSuccessfully({status: StorageOperationsStatuses.success})
		} catch (e) {
			return LocalStorageActions.StorageOperationFailure({status: StorageOperationsStatuses.failure})
		}
	}
}
