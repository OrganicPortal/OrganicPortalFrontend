import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, filter, map, startWith, Subject, switchMap, take, takeUntil, withLatestFrom} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"
import {onInitLoader, PaginatorModel} from "../../../../../../addons/models/models"
import {StoreAuthType} from "../../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {MyCompaniesService} from "../../../my-companies/my-companies.service"
import {SeedManagementService} from "../seed-management.service"

@Component({
	selector: "app-seed-list",
	templateUrl: "./seed-list.component.html",
	styleUrl: "./seed-list.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4
	],

	providers: [
		SeedManagementService
	]
})
export class SeedListComponent extends LifeHooksFactory {
	public authAuditorState$
	public readonly loaderState$ = onInitLoader()
	public readonly paginatorState$ = new BehaviorSubject(new PaginatorModel())
	private readonly requestRefresher$ = new Subject<void>()

	constructor(
		private _store: Store<StoreAuthType>,
		private _myCompaniesService: MyCompaniesService,
		private _seedManagementService: SeedManagementService,
		private _authListeners: AuthListeners
	) {
		super()

		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	public override ngOnInit() {
		super.ngOnInit()


		this.onGetSeedList()
			.pipe(
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}

	private onGetSeedList() {
		return this.authAuditorState$
			.pipe(
				filter(el => !!el.activeCompany),
				take(1),

				withLatestFrom(this.paginatorState$),

				switchMap(el =>
					this.requestRefresher$.pipe(
						startWith(undefined),
						map(el2 => el)
					)
				),

				switchMap((el) => this._seedManagementService
					.onGetSeedList(
						el[0].activeCompany!.CompanyId!,
						el[1]
					)
				)
			)
	}
}
