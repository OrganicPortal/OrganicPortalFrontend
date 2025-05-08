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

export class PaginatorModel {
	Page: number = 1
	PageSize: number = 20

	constructor(Page?: number, PageSize?: number) {
		this.Page = Page ?? 1
		this.PageSize = PageSize ?? 20
	}
}

export const onInitLoader = (isLoaded: boolean = false, isError: boolean = false, error = null) => {
	return new BehaviorSubject<LoaderModel>(new LoaderModel(isLoaded, isError, error))
}
