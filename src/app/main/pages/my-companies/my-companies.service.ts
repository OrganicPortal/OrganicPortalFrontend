import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"

@Injectable({
	providedIn: "root"
})
export class MyCompaniesService {
	constructor(
		private _http: HttpClient
	) {
	}

	public onGetUserCompanies() {
		const apiUrl = "/api/companies/my-companies"
		return this._http.get(apiUrl)
	}
}
