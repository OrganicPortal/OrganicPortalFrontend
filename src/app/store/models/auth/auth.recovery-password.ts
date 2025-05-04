export class AuthRecoveryPasswordReducerModel {
	recoveryToken?: IRecoveryTokenDTO["Data"]["Token"]
	phoneCode?: string

	isFetchSuccess: boolean = true
	isSuccessFetchToken: boolean = false
	isSuccessSavePassword: boolean = false
}

export class RecoveryPasswordGetTokenEffectData {
	payload: {
		Phone: string
	}

	constructor(phone: string) {
		this.payload = {
			Phone: phone
		}
	}
}

export class SaveRecoveredPasswordEffectData {
	recoveryToken: string
	navigateAfterCompleteRequest?: string

	payload: {
		Code: string
		Password: string
	}

	constructor(phoneCode: string, newPassword: string, recoveryToken: string, navigateAfterCompleteRequest?: string) {
		this.payload = {
			Code: phoneCode,
			Password: newPassword
		}

		this.recoveryToken = recoveryToken
		this.navigateAfterCompleteRequest = navigateAfterCompleteRequest
	}
}

export interface IRecoveryTokenDTO {
	Data: {
		Token: string
	}
}
