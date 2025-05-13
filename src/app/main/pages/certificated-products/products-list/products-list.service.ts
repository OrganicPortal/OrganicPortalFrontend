import {Injectable} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {BehaviorSubject, catchError, combineLatest, startWith, Subject, switchMap, tap} from "rxjs"
import {PaginatorModel} from "../../../../../addons/models/models"
import {LoaderStateModel} from "../../organic-map/organic-map.component"
import {CertificatedProductsService} from "../certificated-products.service"

@Injectable()
export class ProductsListService {

	constructor(
		private _certificatedProductsService: CertificatedProductsService,
		private _activatedRoute: ActivatedRoute
	) {
	}


	public onGetProducts(
		paginator$: BehaviorSubject<PaginatorModel>,
		refresher$: Subject<void>,
		loaderState$: BehaviorSubject<LoaderStateModel>
	) {
		return combineLatest([
			this._certificatedProductsService.onHandleQueryParams(this._activatedRoute),
			refresher$.pipe(startWith(null))
		]).pipe(
			tap(([el1, el2]) => {
				loaderState$.next(new LoaderStateModel(false, false))
				paginator$.next(el1)
			}),


			switchMap(([el1, el2]) => {
				return this._certificatedProductsService.onGetCertificatedProducts(el1)
					.pipe(
						tap(() => {
							loaderState$.next(new LoaderStateModel(true, false))

						}),

						catchError(async (err) => {
							loaderState$.next(new LoaderStateModel(true, true))
						})
					)
			})
		)
	}

}
