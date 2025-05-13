import {ChangeDetectionStrategy, Component} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	filter,
	map,
	startWith,
	Subject,
	switchMap,
	takeUntil,
	tap
} from "rxjs"
import {frameSideIn4} from "../../../../addons/animations/shared.animations"
import {LoaderModel, onInitLoader} from "../../../../addons/models/models"
import {
	CertificatedProductsService,
	ISignedSeedBasicInfoDTO
} from "../certificated-products/certificated-products.service"
import {SeedManagementService} from "../interface/seed-management/seed-management.service"
import {QrInfoService} from "./qr-info.service"

@Component({
	selector: "app-qr-info",
	templateUrl: "./qr-info.component.html",
	styleUrl: "./qr-info.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4
	]
})
export class QrInfoComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader()
	public readonly requestIsSuccessComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
	public readonly dataSource$: BehaviorSubject<ISignedSeedBasicInfoDTO | undefined> = new BehaviorSubject<
		ISignedSeedBasicInfoDTO | undefined>(undefined)
	private readonly requestRefresher$: Subject<void> = new Subject<void>()

	constructor(
		private _qrInfoService: QrInfoService,
		private _activatedRoute: ActivatedRoute,
		private _seedManagementService: SeedManagementService,
		private _certificatedProductsService: CertificatedProductsService
	) {
		super()
	}

	public override ngOnInit() {
		super.ngOnInit()

		combineLatest([
			this._activatedRoute.queryParams,
			this.requestRefresher$.pipe(startWith(""))
		]).pipe(
			map(([el1, el2]) => {
				const qrKey = el1["key"]

				if (!qrKey) {
					this.loaderState$.next(new LoaderModel(true, true))
					this.requestIsSuccessComplete$.next(false)
					return
				}

				return decodeURIComponent(qrKey)
			}),

			filter(el => !!el),
			switchMap((el) =>
				this._certificatedProductsService.onGetProductBaseInfo(el!).pipe(
					tap((el) => {
						this.dataSource$.next(el.Data)
						this.loaderState$.next(new LoaderModel(true, false))
						this.requestIsSuccessComplete$.next(true)
					}),

					catchError(async (err) => {
						this.loaderState$.next(new LoaderModel(true, true))

						if (err.status != 500) {
							this.requestIsSuccessComplete$.next(true)
						}
					})
				)
			),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public onFindTreatmentType(treatmentType: number) {
		return this._seedManagementService
			.allowedTreatmentTypes
			.find(el => el.enumType === treatmentType)
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}


}
