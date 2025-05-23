import {Injectable} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {BehaviorSubject, catchError, combineLatest, filter, map, startWith, Subject, switchMap, tap} from "rxjs"
import {LoaderStateModel} from "../../organic-map/organic-map.component"
import {CertificatedProductsService} from "../certificated-products.service"

@Injectable()
export class ProductInfoService {
	constructor(
		private _certificatedProductsService: CertificatedProductsService
	) {
	}

	public onGetProductInfo(loaderState$: BehaviorSubject<LoaderStateModel>, requestRefresher$: Subject<void>, activatedRoute: ActivatedRoute, requestIsSuccessComplete$: BehaviorSubject<boolean>) {
		return combineLatest([
			activatedRoute.params,
			requestRefresher$.pipe(startWith(undefined))
		]).pipe(
			map(([el1, el2]) => {
				const productAccessKey = el1["productAccessKey"]
				const productHistoryKey = el1["productHistoryKey"]

				if (!productAccessKey || !productHistoryKey) {
					loaderState$.next(new LoaderStateModel(true, true))
					return
				}

				loaderState$.next(new LoaderStateModel(false, false))

				return combineLatest([
					this._certificatedProductsService.onGetProductBaseInfo(decodeURIComponent(productAccessKey)),
					this._certificatedProductsService.onGetProductCertificatedInfo(decodeURIComponent(productHistoryKey))
				]).pipe(
					tap(() => {
						loaderState$.next(new LoaderStateModel(true, false))
						requestIsSuccessComplete$.next(true)
					}),

					catchError(async (err) => {
						loaderState$.next(new LoaderStateModel(true, true))

						if(err.status != 500) {
							requestIsSuccessComplete$.next(true)
						}
					})
				)
			}),

			filter(el => !!el),
			switchMap((el) => el)
		)
	}
}
