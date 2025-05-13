import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {
	BehaviorSubject,
	catchError,
	filter,
	map,
	Observable,
	pipe,
	startWith,
	Subject,
	switchMap,
	take,
	takeUntil,
	tap,
	withLatestFrom
} from "rxjs"
import {frameSideIn4, frameSideInOut4} from "../../../../../../addons/animations/shared.animations"
import {
	ConfirmedModalWindowService
} from "../../../../../../addons/components/confirmed-modal-window/confirmed-modal-window.service"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader, PaginatorModel} from "../../../../../../addons/models/models"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {AuthAuditorReducerModel} from "../../../../../store/models/auth/auth.auditor.models"
import {AllowedSeedStatuses, ISeedDTO, SeedManagementService} from "../seed-management.service"

@Component({
	selector: "app-seed-list",
	templateUrl: "./seed-list.component.html",
	styleUrls: [
		"./seed-list.component.scss",
		"./shared.styles.scss"
	],
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4,
		frameSideInOut4
	],

	providers: [
		SeedManagementService
	]
})
export class SeedListComponent extends LifeHooksFactory {
	public authAuditorState$: Observable<AuthAuditorReducerModel>
	public readonly loaderState$ = onInitLoader()
	public readonly paginatorState$ = new BehaviorSubject(new PaginatorModel(1, 200))
	public readonly seedItems$ = new BehaviorSubject<ISeedDTO[]>([])
	public isFirstContentLoaded: boolean = false
	private readonly requestRefresher$ = new Subject<void>()
	private readonly requestHandler$ = new Subject<void>()
	protected readonly AllowedSeedStatuses = AllowedSeedStatuses

	constructor(
		private _seedManagementService: SeedManagementService,
		private _authListeners: AuthListeners,
		private _confirmedModalWindowService: ConfirmedModalWindowService,
		private _ngShortMessageService: NgShortMessageService
	) {
		super()

		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	@HostBinding("@frameSideIn4")
	public override ngOnInit() {
		super.ngOnInit()

		this.onGetSeedList()
			.pipe(
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onGetRootFrame() {
		return null as any
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}

	public onRemoveSeedInfo(seedId: number, companyId: number) {
		const message = `Обрану одиницю продукції буде <span class="little-red-color font-bold">видалено</span>. Продовжити?`
		const obs$ = this._seedManagementService
			.onRemoveSeedFromCompany(seedId, companyId)
			.pipe(
				withLatestFrom(this.paginatorState$),
				this.onGetRefreshListPipe(companyId),
				tap(() => {
					const message = "Дані успішно видалено"
					this._ngShortMessageService.onInitMessage(message, "check-circle")
				}),
				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			)

		this._confirmedModalWindowService
			.onCreateModalWindow(message)
			.pipe(
				filter(el => el.isConfirmWindow),
				tap((el) => {
					this.requestHandler$.next()
					this.loaderState$.next(new LoaderModel(false, false))
				}),
				switchMap((el) => obs$)
			).subscribe()
	}

	private onGetRefreshListPipe(companyId: number) {
		return pipe(
			withLatestFrom(this.paginatorState$),
			switchMap((el) =>
				this._seedManagementService.onGetSeedList(companyId, el[1])
			),

			tap((el => {
				this.loaderState$.next(new LoaderModel(true, false))
				this.seedItems$.next(el.Data.Items)
			})),

			catchError(async (err) => {
				this.loaderState$.next(new LoaderModel(true, true))
			})
		)
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
					this.isFirstContentLoaded = true
					this.loaderState$.next(new LoaderModel(true, true))
				})
			)
	}
}
