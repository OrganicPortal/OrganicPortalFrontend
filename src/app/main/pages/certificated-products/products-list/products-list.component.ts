import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	ConfirmedModalWindowService
} from "../../../../../addons/components/confirmed-modal-window/confirmed-modal-window.service"
import {onInitLoader, PaginatorModel} from "../../../../../addons/models/models"
import {SeedManagementService} from "../../interface/seed-management/seed-management.service"
import {CertificatedProductsService, ISignedInfoItemDTO} from "../certificated-products.service"
import {SelectedHistoryCertModel} from "../product-info/product-info-modal/product-info-modal.component"
import {ProductsListService} from "./products-list.service"

@Component({
	selector: "app-products-list",
	standalone: false,
	templateUrl: "./products-list.component.html",
	styleUrls: [
		"./products-list.component.scss",
		`./../../interface/seed-management/seed-list/shared.styles.scss`
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4
	]
})
export class ProductsListComponent extends LifeHooksFactory {
	public readonly paginator$ = new BehaviorSubject<PaginatorModel>(new PaginatorModel(1, 20))
	public readonly loaderState$ = onInitLoader()
	public isFirstContentLoaded: boolean = false
	public readonly maxRecords$ = new Subject<number>()
	public readonly dataSource$ = new BehaviorSubject<ISignedInfoItemDTO[]>([])
	public readonly pageSizeOptions: Array<number> = [10, 20, 50, 100]
	private readonly requestRefresher$: Subject<void> = new Subject<void>()

	public readonly selectedHistoryCert$:
		BehaviorSubject<SelectedHistoryCertModel | undefined>
		= new BehaviorSubject<SelectedHistoryCertModel | undefined>(undefined)

	@ViewChild("QrCodeTemplate") public qrCodeTemplate!: TemplateRef<any>
	constructor(
		private _productsListService: ProductsListService,
		private _seedManagementService: SeedManagementService,
		private _confirmedModalWindowService: ConfirmedModalWindowService,
		private _certificatedProductsService: CertificatedProductsService
	) {
		super()
	}

	public onEncodeUrl(url: string){
		return encodeURIComponent(url)
	}

	public onGenerateQrCode(qrCode: string, accessKey: string, historyKey: string) {
		const data = new SelectedHistoryCertModel(qrCode, accessKey, historyKey)
		this.selectedHistoryCert$.next(data)

		this._confirmedModalWindowService
			.onCreateModalWindow(this.qrCodeTemplate, "confirm", undefined, false, data)
			.pipe(takeUntil(this.componentDestroy$))
			.subscribe()
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._productsListService
			.onGetProducts(this.paginator$, this.requestRefresher$, this.loaderState$)
			.pipe(
				tap((el) => {
					this.isFirstContentLoaded = true

					if (!el)
						return

					this.maxRecords$.next(el.Data.Count)
					this.dataSource$.next(el.Data.Items)
				}),

				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
	}

	public onFindTreatmentType(num: number) {
		return this._seedManagementService.allowedTreatmentTypes.find(el => el.enumType === num)
	}

	public onGetRootFrame() {
		return null as any
	}

	public onPageChange(event: any, paginatorState: PaginatorModel) {
		paginatorState.PageSize = event.pageSize
		const newPaginatorState = new PaginatorModel(event.pageIndex + 1, paginatorState.PageSize)

		this._certificatedProductsService.onGoToPage(newPaginatorState)
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}
}
