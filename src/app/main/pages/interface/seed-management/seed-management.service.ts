import {HttpClient, HttpContext} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {merge, Observable, switchMap} from "rxjs"
import {PaginatorModel} from "../../../../../addons/models/models"
import {AllowedHttpContextTokens} from "../../../../../addons/services/http-interceptor.service"

@Injectable()
export class SeedManagementService {
	public readonly allowedTreatmentTypes: TreatmentTypeModel[] = [
		new TreatmentTypeModel("Не вказано", "close-circle", AllowedTreatmentTypes.Uncnown),
		new TreatmentTypeModel("Оброблено", "pills-3", AllowedTreatmentTypes.Treated),
		new TreatmentTypeModel("Не оброблено", "quit-full-screen", AllowedTreatmentTypes.Untreated)
	]

	constructor(
		private _http: HttpClient
	) {
	}

	public onAddCertInfoToSeed(companyId: number, seedId: number, payload: IAddCertDTO[], isDisableHandleSuccessMessages: boolean = false) {
		const apiUrl = `/api/seeds/certs/add?companyId=${companyId}&seedId=${seedId}`

		const context = new HttpContext()
		if (isDisableHandleSuccessMessages) {
			const disableSendSuccessMessages = AllowedHttpContextTokens.get("DisableSendSuccessMessages")!
			context.set(disableSendSuccessMessages.token, "")
		}

		const requests$ = payload.map(el => {
			const _payload = {
				CERTId: el.Id
			}

			return this._http.post(apiUrl, _payload, {context: context})
		})

		return merge(...requests$)
	}

	public onEditSeedBasicInfo(seedId: number, companyId: number, payload: SeedModelDTO, isDisableHandleSuccessMessages: boolean = false) {
		const apiUrl = `api/seeds/edit?seedId=${seedId}&companyId=${companyId}`

		const context = new HttpContext()
		if (isDisableHandleSuccessMessages) {
			const disableSendSuccessMessages = AllowedHttpContextTokens.get("DisableSendSuccessMessages")!
			context.set(disableSendSuccessMessages.token, "")
		}

		return this._http.patch(apiUrl, payload, {context: context})
	}

	public onGetAllowedCerts() {
		const apiUrl = "/api/seeds/certs"
		return this._http.get<{ Data: IAllowedCertsDTO[] }>(apiUrl)
	}

	public onGetSeedInfo(seedId: number, companyId: number) {
		const apiUrl = `/api/seeds/info?seedId=${seedId}&companyId=${companyId}`
		return this._http.get<{ Data: ISeedBaseDTO }>(apiUrl)
	}

	public onGetSeedList(companyId: number, paginator?: PaginatorModel) {
		const apiUrl = `/api/seeds/list?companyId=${companyId}`
		return this._http.post<{
			Data: { Count: number, Items: ISeedDTO[] }
		}>(apiUrl, paginator ?? new PaginatorModel())
	}

	public onRemoveCertInfoFromSeed(companyId: number, payload: IRemoveCertDTO[], isDisableHandleSuccessMessages: boolean = false) {
		const context = new HttpContext()
		if (isDisableHandleSuccessMessages) {
			const disableSendSuccessMessages = AllowedHttpContextTokens.get("DisableSendSuccessMessages")!
			context.set(disableSendSuccessMessages.token, "")
		}

		const requests$ = payload.map(el => {
			const apiUrl = `/api/seeds/certs/remove?companyId=${companyId}&UseCERTId=${el.Id}`
			return this._http.delete(apiUrl, {context: context})
		})

		return merge(...requests$)
	}

	public onRemoveSeedFromCompany(seedId: number, companyId: number) {
		const apiUrl = `/api/seeds/remove?companyId=${companyId}&seedId=${seedId}`
		return this._http.delete(apiUrl)
	}

	public onSaveEditedSeedAndCertsInfo(seedId: number, companyId: number, seedData: SeedModelDTO, newCerts: IAddCertDTO[] = [], removedCerts: IRemoveCertDTO[] = [], isDisableHandleSuccessMessages: boolean = false) {
		const certRequests$: Observable<any>[] = []

		if (newCerts.length > 0) {
			const req$ = this.onAddCertInfoToSeed(companyId, seedId, newCerts, isDisableHandleSuccessMessages)
			certRequests$.push(req$)
		}

		if (removedCerts.length > 0) {
			const req$ = this.onRemoveCertInfoFromSeed(companyId, removedCerts, isDisableHandleSuccessMessages)
			certRequests$.push(req$)
		}

		return this.onEditSeedBasicInfo(seedId, companyId, seedData, isDisableHandleSuccessMessages)
			.pipe(switchMap((el) => merge(...certRequests$)))
	}

	public onSaveSeedAndCertsInfo(companyId: number, seedData: SeedModelDTO, certsData: IAllowedCertsDTO[]) {
		return this.onSaveSeedInfo(companyId, seedData)
			.pipe(
				switchMap((el) =>
					this.onAddCertInfoToSeed(companyId, el.Data.SeedId, certsData)
				)
			)
	}

	public onSaveSeedInfo(companyId: number, payload: SeedModelDTO) {
		const apiUrl = `/api/seeds/new?companyId=${companyId}`
		return this._http.post<{ Data: { SeedId: number } }>(apiUrl, payload)
	}

	public onSendSeedToCertification(seedId: number, companyId: number) {
		const apiUrl = `/api/seeds/send-certifications?companyId=${companyId}&seedId=${seedId}`
		return this._http.get(apiUrl)
	}
}

export interface ISeedDTO extends ISeedBaseDTO {
	Id: number
}

export interface ISeedBaseDTO {
	Name: string
	ScientificName: string
	Variety: string
	SeedType: string
	BatchNumber: string
	HarvestDate: string
	ExpiryDate: string
	TreatmentType: number
	StorageConditions: string
	AverageWeightThousandSeeds: number
	Status: number
	CERTsList: {
		CERTId: number
		Id: number
	}[]
	Company: any | null
	CompanyId: number
	CreatedDate: string
}

export class SeedModelDTO {
	Name: string
	ScientificName: string
	Variety: string
	SeedType: string
	BatchNumber: string

	HarvestDate: Date
	ExpiryDate: Date
	StorageConditions: string

	TreatmentType: AllowedTreatmentTypes
	AverageWeightThousandSeeds: number

	constructor(Name: string, ScientificName: string, Variety: string, SeedType: string, BatchNumber: string, HarvestDate: Date, ExpiryDate: Date, StorageConditions: string, TreatmentType: AllowedTreatmentTypes, AverageWeightThousandSeeds: number) {
		this.Name = Name
		this.ScientificName = ScientificName
		this.Variety = Variety
		this.SeedType = SeedType
		this.BatchNumber = BatchNumber
		this.HarvestDate = HarvestDate
		this.ExpiryDate = ExpiryDate
		this.StorageConditions = StorageConditions
		this.TreatmentType = TreatmentType
		this.AverageWeightThousandSeeds = AverageWeightThousandSeeds
	}
}

export interface IRemoveCertDTO extends IAddCertDTO {
}

export interface IAddCertDTO {
	Id: number
}

export interface IAllowedCertsDTO {
	Description: string
	Id: number
	IsAddInfo: boolean
	IssueBy: string

	Name: string
	Number: string
}

export class TreatmentTypeModel {
	name: string
	icon: string
	enumType: AllowedTreatmentTypes

	constructor(name: string, icon: string, enumType: AllowedTreatmentTypes) {
		this.name = name
		this.enumType = enumType
		this.icon = icon
	}
}

export class AllowedStatusesModel {
	name: string
	enumType: AllowedSeedStatuses

	constructor(name: string, enumType: AllowedSeedStatuses) {
		this.name = name
		this.enumType = enumType
	}
}

export enum AllowedSeedStatuses {
	New = 0,
	AwaitCertificateConfirmation = 1,
	AwaiSigning = 2,
	Signed = 3
}

export enum AllowedTreatmentTypes {
	Uncnown = 0,
	Untreated = 1,
	Treated = 2
}
