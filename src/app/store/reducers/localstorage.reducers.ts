import {createReducer, on} from "@ngrx/store"
import * as LocalStorageActions from "../actions/localstorage.actions"
import {StorageOperationsReducerModel, StorageOperationsStatuses} from "../models/localstorage/models"

//#region Storage Operations Reducer
export const StorageOperations = createReducer(
	new StorageOperationsReducerModel(),
	on(LocalStorageActions.UpdateOrSaveDataToStorage,
		(state, action) =>
			({...action})
	),

	on(LocalStorageActions.ClearStorage,
		(state, action) =>
			({...action})
	),

	on(LocalStorageActions.RemoveFromStorage,
		(state, action) =>
			({...action})
	),

	on(LocalStorageActions.SyncStorageByKeys,
		(state, action) =>
			({...action})
	),

	on(LocalStorageActions.StorageOperationSuccessfully,
		(state, action) =>
			({
				status: StorageOperationsStatuses.success
			})
	),

	on(LocalStorageActions.StorageOperationFailure,
		(state, action) =>
			({
				...state,
				...action,
				status: StorageOperationsStatuses.failure
			})
	)
)
//#endregion Storage Operations Reducer
