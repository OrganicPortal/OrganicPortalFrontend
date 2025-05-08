import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {merge, switchMap} from "rxjs"
import {PaginatorModel} from "../../../../../addons/models/models"

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

	public onAddCertInfoToSeed(companyId: number, seedId: number, payload: IAllowedCertsDTO[]) {
		const apiUrl = `/api/seeds/certs/add?companyId=${companyId}&seedId=${seedId}`
		const requests$ = payload.map(el => {
			const _payload = {
				CERTId: el.Id
			}

			return this._http.post(apiUrl, _payload)
		})

		return merge(...requests$)
	}

	public onGetAllowedCerts() {
		const apiUrl = "/api/seeds/certs"
		return this._http.get<{ Data: IAllowedCertsDTO[] }>(apiUrl)
	}

	public onGetSeedList(companyId: number, paginator?: PaginatorModel) {
		const apiUrl = `/api/seeds/list?companyId=${companyId}`
		return this._http.post(apiUrl, paginator ?? new PaginatorModel())
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
