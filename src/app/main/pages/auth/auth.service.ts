import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(
		private _http: HttpClient
	) {
	}

	public onLogin(payload: LoginModel) {
		let apiUrl = "api/auth/sign-in"
		return this._http.post(apiUrl, payload)
	}

	public onRegister(payload: RegistrationModel) {
		let apiUrl = "api/auth/sign-up"
		return this._http.post(apiUrl, payload)
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

export class RegistrationModel {
	FirstName: string
	MiddleName: string
	LastName: string

	Password: string
	Phone: string


	constructor(FirstName: string, MiddleName: string, LastName: string, Password: string, Phone: string) {
		this.FirstName = FirstName
		this.MiddleName = MiddleName
		this.LastName = LastName
		this.Password = Password
		this.Phone = Phone
	}
}
