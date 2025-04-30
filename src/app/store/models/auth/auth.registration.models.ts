import {HttpErrorResponse} from "@angular/common/http"

export class RegistrationReducerModel {
	Data?: IRegistrationDTO["Data"]
	Message?: string
	Error?: HttpErrorResponse | any

	type?: string
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
	isAccConfirmed: boolean = false
}

export interface IRegistrationDTO {
	Message: string
	Data: {
		Token: string
	}
}

export class RegistrationModel {
	FirstName: string
	LastName: string
	MiddleName: string
	Password: string
	Phone: string

	constructor(FirstName: string, LastName: string, MiddleName: string, Phone: string, Password: string) {
		this.FirstName = FirstName
		this.MiddleName = MiddleName
		this.LastName = LastName
		this.Password = Password
		this.Phone = Phone
	}
}

export interface IRegistrationEffectData {
	type: string
	payload: RegistrationModel
}
