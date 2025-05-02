import {Injectable} from "@angular/core"

@Injectable()
export class AuthService {
	public inputtedPhoneForRecovery: string = ""

	constructor() {
	}
}

export class LoginModel {
	Login: string
	Password: string

	constructor(Login: string, Password: string) {
		this.Login = Login
		this.Password = Password
	}
}
