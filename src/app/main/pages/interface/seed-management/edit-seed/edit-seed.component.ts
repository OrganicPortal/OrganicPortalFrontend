import {Component} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {filter, map, Observable, of, startWith, Subject, switchMap, takeUntil} from "rxjs"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {AuthAuditorReducerModel} from "../../../../../store/models/auth/auth.auditor.models"
import {SeedManagementService} from "../seed-management.service"

@Component({
	selector: "app-edit-seed",
	standalone: false,
	templateUrl: "./edit-seed.component.html",
	styleUrl: "./edit-seed.component.scss"
})
export class EditSeedComponent extends LifeHooksFactory {
	public authAuditorState$: Observable<AuthAuditorReducerModel>
	public readonly loaderState$ = onInitLoader()
	private readonly requestRefresher$ = new Subject<void>()

	constructor(
		private _authListeners: AuthListeners,
		private _activatedRoute: ActivatedRoute,
		private _ngShortMessageService: NgShortMessageService,
		private _seedManagementService: SeedManagementService
	) {
		super()
		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._activatedRoute.params
			.pipe(
				switchMap((el) => {
					const seedId = el["seedId"]

					if (!seedId || !Number.isInteger(Number(seedId))) {
						const message = "Вказано хибний ідентифікатор насіння"
						this._ngShortMessageService.onInitMessage(message, "info-circle")
						return of(undefined)
					}

					return this.authAuditorState$.pipe(
						map((el2) => {
							return {
								seedId: Number(seedId),
								companyId: el2.activeCompany?.CompanyId
							}
						})
					)
				}),

				filter(el => !!el),
				switchMap((el) => this.requestRefresher$.pipe(
					startWith(undefined),
					map(() => el)
				)),

				switchMap((el) => {
					this.loaderState$.next(new LoaderModel(false, false))
					return this.onGetSeedInfo(el.seedId, el.companyId ?? -1)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	private onGetSeedInfo(seedId: number, companyId: number) {
		return this._seedManagementService.onGetSeedInfo(seedId, companyId)
			.pipe()
	}
}
