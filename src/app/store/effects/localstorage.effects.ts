import {inject, Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {exhaustMap, filter, fromEvent, map} from "rxjs"
import {
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

	constructor() {
	}

	private onClearStorage() {
		try {
			localStorage.clear()
			return LocalStorageActions.StorageOperationSuccessfully({status: StorageOperationsStatuses.success})
		} catch (e) {
			return LocalStorageActions.StorageOperationFailure({status: StorageOperationsStatuses.failure})
		}
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
