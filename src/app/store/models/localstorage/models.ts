export const LOCAL_STORAGE_TOKEN_KEY = "organic-portal-token"
export const LOCAL_STORAGE_COMPONENTS_SETTINGS = "organic-portal-components"
export const ACTIVE_COMPANY_ID = "active-company-id"

export type ReservedLocalStorageKeys = typeof LOCAL_STORAGE_TOKEN_KEY | typeof LOCAL_STORAGE_COMPONENTS_SETTINGS

export class LocalStorageModel {
	[LOCAL_STORAGE_TOKEN_KEY]: string | undefined
	[LOCAL_STORAGE_COMPONENTS_SETTINGS]: string | undefined
	[ACTIVE_COMPANY_ID]: string | undefined
}

export enum StorageOperationsStatuses {
	"success" = "success",
	"failure" = "failure",
}

export class StorageOperationsReducerModel {
	key?: string
	value?: any
	keys?: string[]
	status?: StorageOperationsStatuses
}

export class StorageStateReducerModel extends LocalStorageModel {
	isSuccessParse: boolean = false
}

export class UpdateOrSaveDataToStorageModel {
	key: string
	value: any

	constructor(key: string, value: any) {
		this.key = key
		this.value = value
	}
}

export class RemoveFromStorageModel {
	key: string

	constructor(key: string) {
		this.key = key
	}
}

export class SyncStorageModel {
	keys: string[]

	constructor(keys: string[]) {
		this.keys = keys
	}
}

export class StorageOperationStatusModel {
	status!: StorageOperationsStatuses
}
