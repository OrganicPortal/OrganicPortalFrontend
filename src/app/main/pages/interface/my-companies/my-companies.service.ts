import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"

@Injectable({
	providedIn: "root"
})
export class MyCompaniesService {
	constructor(
		private _http: HttpClient,
		private _ngShortMessageService: NgShortMessageService
	) {
	}

	public onAddTypeOfInteractivity(companyId: number, typeOfInteractivity: number) {
		const apiUrl = `/api/companies/add-type-of-interactivity?companyId=${companyId}`
		return this._http.patch<IGetCompanyDTO>(apiUrl, typeOfInteractivity)
	}

	public onArchiveCompany(companyId: number) {
		const apiUrl = `/api/companies/archiving?companyId=${companyId}`
		return this._http.get(apiUrl)
	}

	public onCreateCompany(payload: CreateCompanyModelDTO) {
		const apiUrl = "/api/companies/new"
		return this._http.post<{ Data: { CompanyId: number } }>(apiUrl, payload)
	}

	public onEditCompanyBasicInfo(companyId: number, payload: EditCompanyBasicInfoModel) {
		const apiUrl = `/api/companies/edit?companyId=${companyId}`
		return this._http.patch<IGetCompanyDTO>(apiUrl, payload)
	}

	public onGetArchivatedCompanyStatus(companyId: number) {
		const apiUrl = `/api/companies/is-archivated?companyId=${companyId}`
		return this._http.get<{ Data: { isArchivated: boolean } }>(apiUrl)
	}

	public onGetCompanyInfoById(companyId: number) {
		const apiUrl = `/api/companies/info?companyId=${companyId}`
		return this._http.get<IGetCompanyDTO>(apiUrl)
	}
}

export class EditCompanyBasicInfoModel {
	Name: string
	Description: string
	Address: string
	LegalType: number
	EstablishmentDate: string
	ContactList: ContactItemModel[]
	TypeOfActivityList: number[]

	constructor(Name: string, Description: string, Address: string, LegalType: number, EstablishmentDate: string, ContactList: ContactItemModel[], TypeOfActivityList: number[]) {
		this.Name = Name
		this.Description = Description
		this.Address = Address
		this.LegalType = LegalType
		this.EstablishmentDate = EstablishmentDate
		this.ContactList = ContactList
		this.TypeOfActivityList = TypeOfActivityList
	}
}

export interface IGetCompanyDTO {
	Data: {
		Id: number
		Name: string
		Description: string
		RegistrationNumber: string
		Address: string
		LegalType: number
		LegalDescription: string
		EstablishmentDate: string
		ArchivationDate: string | null
		isArchivated: boolean
		TrustStatus: number
		TrustDescription: string
		CreatedDate: string

		ContactList: {
			Id: number
			Type: number
			TypeDescription: string
			Contact: string
		}[]

		EmployeesList: {
			FirstName: string
			LastName: string
			MiddleName: string

			Role: number
			UserId: number
			Id: number
		}[]

		TypeOfActivityList: {
			Id: number
			Type: number
			TypeDescription: string
		}[]
	}
}

export class CreateCompanyModelDTO {
	Name: string
	Description: string
	RegistrationNumber: string
	Address: string

	LegalType: number
	EstablishmentDate: Date | string
	TypeOfActivityList: number[]
	ContactList: ContactItemModel[]

	constructor(Name: string, Description: string, RegistrationNumber: string, Address: string, LegalType: number, EstablishmentDate: Date | string, ContactList: ContactItemModel[], TypeOfActivityList: number[]) {
		this.Name = Name
		this.Description = Description
		this.RegistrationNumber = RegistrationNumber
		this.Address = Address
		this.LegalType = LegalType
		this.EstablishmentDate = EstablishmentDate
		this.ContactList = ContactList
		this.TypeOfActivityList = TypeOfActivityList
	}
}

export class ContactItemModel {
	Type: number
	Contact: string

	constructor(Type: number, Contact: string) {
		this.Type = Type
		this.Contact = Contact
	}
}
