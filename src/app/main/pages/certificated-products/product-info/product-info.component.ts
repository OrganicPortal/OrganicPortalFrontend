import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, filter, Subject, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	ConfirmedModalWindowService
} from "../../../../../addons/components/confirmed-modal-window/confirmed-modal-window.service"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {onInitLoader} from "../../../../../addons/models/models"
import {SeedManagementService} from "../../interface/seed-management/seed-management.service"
import {IHistoryItem, ISignedCertificatedInfoDTO, ISignedSeedBasicInfoDTO} from "../certificated-products.service"
import {SelectedHistoryCertModel} from "./product-info-modal/product-info-modal.component"
import {ProductInfoService} from "./product-info.service"

@Component({
	selector: "app-product-info",
	standalone: false,
	templateUrl: "./product-info.component.html",
	styleUrls: [
		"./product-info.component.scss",
		"./shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4
	]
})
export class ProductInfoComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader()
	public readonly requestIsSuccessComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	public readonly dataSource$: BehaviorSubject<{
		reads: ISignedSeedBasicInfoDTO,
		history: ISignedCertificatedInfoDTO
	} | undefined> = new BehaviorSubject<{
		reads: ISignedSeedBasicInfoDTO,
		history: ISignedCertificatedInfoDTO
	} | undefined>(undefined)
	@ViewChild("QrCodeTemplate") public qrCodeTemplate!: TemplateRef<any>
	public readonly selectedHistoryCert$:
		BehaviorSubject<SelectedHistoryCertModel | undefined>
		= new BehaviorSubject<SelectedHistoryCertModel | undefined>(undefined)

	private readonly requestRefresher$: Subject<void> = new Subject<void>()

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _productInfoService: ProductInfoService,
		private _seedManagementService: SeedManagementService,
		private _confirmedModalWindowService: ConfirmedModalWindowService,
		private _ngShortMessageService: NgShortMessageService
	) {
		super()
	}

	public override ngOnInit() {
		this._productInfoService
			.onGetProductInfo(this.loaderState$, this.requestRefresher$, this._activatedRoute, this.requestIsSuccessComplete$)
			.pipe(
				filter(el => !!el),
				tap(([el1, el2]) => {
					this.dataSource$.next({
						reads: el1.Data,
						history: el2.Data
					})
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public onCopyRecord() {
		const message = "Entry copied successfully"
		this._ngShortMessageService.onInitMessage(message, "check-circle")
	}

	public onFindTreatmentType(treatmentType: number) {
		return this._seedManagementService
			.allowedTreatmentTypes
			.find(el => el.enumType === treatmentType)
	}

	public onGenerateQrCode(qrCode: string, accessKey: string, historyKey: string) {
		const data = new SelectedHistoryCertModel(qrCode, accessKey, historyKey)
		this.selectedHistoryCert$.next(data)

		this._confirmedModalWindowService
			.onCreateModalWindow(this.qrCodeTemplate, "confirm", undefined, false, data)
			.pipe(takeUntil(this.componentDestroy$))
			.subscribe()
	}

	public onGetCopyMessage(item: IHistoryItem) {
		return `Name: ${item.Name},
		Sort: ${item.Variety},
		Created date: ${item.CreatedDate},
		History key: ${item.HistoryKey},
		Account public key: ${item.AccountPublicKey}`
	}

	public onGetFirstHistoryItem(history: ISignedCertificatedInfoDTO) {
		if (history.History?.length == 0 || !history.History?.length)
			return
		return history.History[0]
	}

	public onGetQRCodeData(history: ISignedCertificatedInfoDTO) {
		if (history.History?.length == 0 || !history.History?.length)
			return

		return history.History[0].QrBase64
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}
}

