import {Injectable} from "@angular/core"

@Injectable({
	providedIn: "root"
})
export class AuthService {
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
