import {HttpErrorResponse} from "@angular/common/http"

export class ResendPhoneCodeReducerModel {
	Data?: any
	Message?: string
	Error?: HttpErrorResponse | any

	type?: string
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
}
