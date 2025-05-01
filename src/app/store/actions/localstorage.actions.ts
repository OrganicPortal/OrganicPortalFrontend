import {createAction, props} from "@ngrx/store"
import {
	RemoveFromStorageModel,
	StorageOperationsReducerModel,
	StorageOperationStatusModel,
	StorageStateReducerModel,
	SyncStorageModel,
	UpdateOrSaveDataToStorageModel
} from "../models/localstorage/models"

export enum Actions {
	LocalStorageOperationsReducerName = "localStorageOperationsReducer",
	UpdateOrSaveDataToStorage = "[LOCAL STORAGE] Update or save data to storage",
	RemoveFromStorage = "[LOCAL STORAGE] Remove from storage",
	ClearStorage = "[LOCAL STORAGE] Clear storage",
	SyncStorageByKeys = "[LOCAL STORAGE] Sync by keys",

	StorageOperationSuccessfully = "[LOCAL STORAGE] Storage operation successfully",
	StorageOperationFailure = "[LOCAL STORAGE] Storage operation failure",

	StorageStateReducerName = "storageStateReducer",
	StorageStateInitFetch = "[LOCAL STORAGE] Init to fetch storage state",
	StorageState = "[LOCAL STORAGE] Storage state",
}

//#region Storage Operations
export const UpdateOrSaveDataToStorage = createAction(Actions.UpdateOrSaveDataToStorage, props<UpdateOrSaveDataToStorageModel>())
export const RemoveFromStorage = createAction(Actions.RemoveFromStorage, props<RemoveFromStorageModel>())
export const ClearStorage = createAction(Actions.ClearStorage, props<any>())
export const SyncStorageByKeys = createAction(Actions.SyncStorageByKeys, props<SyncStorageModel>())

export const StorageOperationSuccessfully = createAction(Actions.StorageOperationSuccessfully, props<StorageOperationStatusModel>())
export const StorageOperationFailure = createAction(Actions.StorageOperationFailure, props<StorageOperationStatusModel>())


//#endregion Storage Operations

//#region Storage States
export const StorageStateFetchInit = createAction(Actions.StorageStateInitFetch)
export const StorageStateAggregator = createAction(Actions.StorageState, props<StorageStateReducerModel>())
//#endregion Storage States

export type LocalStorageOperations = {
	[Actions.LocalStorageOperationsReducerName]: StorageOperationsReducerModel,
}

export type LocalStorageState = {
	[Actions.StorageStateReducerName]: StorageStateReducerModel
}
