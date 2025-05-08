import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {
	BehaviorSubject,
	catchError,
	filter,
	map,
	startWith,
	Subject,
	switchMap,
	take,
	takeUntil,
	tap,
	withLatestFrom
} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"
import {LoaderModel, onInitLoader, PaginatorModel} from "../../../../../../addons/models/models"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {AllowedSeedStatuses, ISeedDTO, SeedManagementService} from "../seed-management.service"

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
	public readonly paginatorState$ = new BehaviorSubject(new PaginatorModel(1, 200))
	public readonly seedItems$ = new BehaviorSubject<ISeedDTO[]>([])
	public isFirstContentLoaded: boolean = false
	private readonly requestRefresher$ = new Subject<void>()
	protected readonly AllowedSeedStatuses = AllowedSeedStatuses
	protected readonly document = document

	constructor(
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
						map(el2 => {
							this.loaderState$.next(new LoaderModel(false, false))
							return el
						})
					)
				),

				switchMap((el) => this._seedManagementService
					.onGetSeedList(
						el[0].activeCompany!.CompanyId!,
						el[1]
					)
				),

				tap((el) => {
					this.seedItems$.next(el.Data.Items)
					this.isFirstContentLoaded = true
					this.loaderState$.next(new LoaderModel(true, false))
				}),

				catchError(async (err) => {
					this.loaderState$.next(new LoaderModel(true, true))
				})
			)
	}
}
