import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {map} from "rxjs"
import {PaginatorModel} from "../../../../addons/models/models"
import {AllowedTreatmentTypes} from "../interface/seed-management/seed-management.service"

@Injectable()
export class CertificatedProductsService {

	constructor(
		private _http: HttpClient,
		private _router: Router
	) {
	}

	public onGetCertificatedProducts(paginator?: PaginatorModel) {
		const apiUrl = `/api/signed-info/list`
		const payload = {
			Paginator: paginator ?? new PaginatorModel(1, 500)
		}

		return this._http.post<ISignedItemsDTO>(apiUrl, payload)
	}

	public onGetProductBaseInfo(productAccessKey: string) {
		const apiUrl = `/api/signed-info/reads`
		const payload = {
			PubKey: productAccessKey
		}

		return this._http.post<{ Data: ISignedSeedBasicInfoDTO }>(apiUrl, payload)
	}

	public onGetProductCertificatedInfo(historyKey: string) {
		const apiUrl = `/api/signed-info/history`
		const payload = {
			HistoryKey: historyKey
		}

		return this._http.post<{ Data: ISignedCertificatedInfoDTO }>(apiUrl, payload)
	}

	public onGoToPage(paginatorState: PaginatorModel) {
		this.onChangeQueryParams(paginatorState)
	}

	public onHandleQueryParams(activatedRoute: ActivatedRoute) {
		return activatedRoute.queryParams
			.pipe(
				map((el) => {
					const page = el["page"]
					const pageSize = el["pageSize"]

					const _page = this.isPageNumberValidation(page)
					const _pageSize = this.isPageSizeValidation(pageSize)

					return new PaginatorModel(_page, _pageSize)
				})
			)
	}

	private isIntegerValidation(num: string) {
		return Number.isInteger(Number(num))
	}

	private isPageNumberValidation(num: string) {
		const isNumber = this.isIntegerValidation(num)

		if (!isNumber)
			return new PaginatorModel().Page

		if (Number(num) <= 0) {
			return new PaginatorModel().Page
		}

		return Number(num)
	}

	private isPageSizeValidation(num: string) {
		const isNumber = this.isIntegerValidation(num)

		if (!isNumber)
			return new PaginatorModel().PageSize

		if (Number(num) <= 0 || Number(num) > 500) {
			return new PaginatorModel().PageSize
		}

		return Number(num)
	}

	private onChangeQueryParams(params: PaginatorModel) {
		this._router.navigate([], {
			queryParams: {
				page: params["Page"],
				pageSize: params["PageSize"]
			}
		})
	}
}

export interface ISignedCertificatedInfoDTO {
	Last: {
		Key: ISignedSeedBasicInfoDTO["Key"]
		HistoryKey: ISignedSeedBasicInfoDTO["HistoryKey"]
		CreatedDate: ISignedSeedBasicInfoDTO["CreatedDate"]
		SeedInfo: ISignedSeedBasicInfoDTO["SeedInfo"]

		CompanyInfo: ISignedSeedBasicInfoDTO["CompanyInfo"]
		PublisherInfo: ISignedSeedBasicInfoDTO["PublisherInfo"]

		CERTList: ISignedSeedBasicInfoDTO["CERTList"]
	}

	History: IHistoryItem[]
}

export interface IHistoryItem {
	Id: number
	HistoryKey: string
	AccountPublicKey: string
	Name: string
	Variety: string
	SeedType: string
	TreatmentType: AllowedTreatmentTypes
	CompanyName: string
	CreatedDate: string

	QrBase64: string
}

export interface ISignedSeedBasicInfoDTO {
	Key: string
	HistoryKey: string
	CreatedDate: string

	SeedInfo: {
		Name: string
		ScientificName: string
		Variety: string
		SeedType: string
		BatchNumber: string

		HarvestDate: string
		ExpiryDate: string

		TreatmentType: AllowedTreatmentTypes

		TreatmentDescription: string
		StorageConditions: string
		AverageWeightThousandSeeds: number
	}

	CompanyInfo: {
		Name: string
		Description: string
		Address: string
	}

	PublisherInfo: {
		Name: string
		Href: string
	}

	CERTList: {
		Name: string
		Number: string
		IssuedBy: string
		Description: string
		IsAddlInfo: boolean
		CreatedDate?: string
	}[]
}

export interface ISignedItemsDTO {
	Data: {
		Count: number,
		Items: ISignedInfoItemDTO[]
	}
}

export interface ISignedInfoItemDTO {
	Id: number

	HistoryKey: string
	AccountPublicKey: string
	Name: string
	Variety: string
	SeedType: string
	CompanyName: string
	CreatedDate: string
	QrBase64: string

	TreatmentType: AllowedTreatmentTypes
}
