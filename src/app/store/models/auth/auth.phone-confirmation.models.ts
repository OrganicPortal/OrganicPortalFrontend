import {HttpErrorResponse} from "@angular/common/http"
import {IRegistrationDTO} from "./auth.registration.models"

export class PhoneConfirmationReducerModel {
	Data?: any
	Message?: string
	Error?: HttpErrorResponse | any
	RegistrationData?: IRegistrationDTO

	type?: string
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
}

export class PhoneConfirmationRegDataSetterModel {
	RegistrationData: IRegistrationDTO

	constructor(RegistrationData: IRegistrationDTO) {
		this.RegistrationData = RegistrationData
	}
}

export class PhoneConfirmationModel {
	Code: string

	constructor(Code: string) {
		this.Code = Code
	}
}


export class PhoneConfirmationEffectData {
	payload: PhoneConfirmationModel

	constructor(payload: PhoneConfirmationModel) {
		this.payload = payload
	}
}
