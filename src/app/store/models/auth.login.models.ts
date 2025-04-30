import {HttpErrorResponse} from "@angular/common/http"

export class LoginReducerModel {
	Data?: ILoginDTO
	Message?: string
	Error?: HttpErrorResponse | any

	type?: string
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
}

export class LoginEffectData {
	payload: LoginDataModel

	constructor(payload: LoginDataModel) {
		this.payload = payload
	}
}

export class LoginDataModel {
	Login: string
	Password: string

	constructor(Login: string, Password: string) {
		this.Login = Login
		this.Password = Password
	}
}

export interface ILoginDTO {
	Data: {
		Token: string
	}
}
