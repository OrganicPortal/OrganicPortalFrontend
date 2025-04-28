import {BehaviorSubject} from "rxjs"

export class LoaderModel {
	isLoaded: boolean = false
	isError: boolean = false
	error?: string | null = null

	constructor(isLoaded: boolean, isError: boolean, error?: string | null) {
		this.isLoaded = isLoaded
		this.isError = isError

		this.error = error
	}
}

export const onInitLoader = (isLoaded: boolean = false, isError: boolean = false, error = null) => {
	return new BehaviorSubject<LoaderModel>(new LoaderModel(isLoaded, isError, error))
}
