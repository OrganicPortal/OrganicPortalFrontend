import {ChangeDetectionStrategy, Component} from "@angular/core"
import {NavigationEnd} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {catchError, filter, merge, startWith, Subject, switchMap, take, takeUntil, tap} from "rxjs"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import {ListenersService} from "../../../../../addons/services/listeners.service"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"
import {MyCompaniesService} from "../../my-companies/my-companies.service"

@Component({
	selector: "app-seed-management",
	standalone: false,
	templateUrl: "./seed-management.component.html",
	styleUrl: "./seed-management.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class SeedManagementComponent extends LifeHooksFactory {
	public authAuditorState$
	public readonly loaderState$ = onInitLoader()
	private readonly requestRefresher$ = new Subject<void>()

	constructor(
		private _authListeners: AuthListeners,
		private _listenersService: ListenersService,
		private _myCompaniesService: MyCompaniesService,
		private _store: Store<AuthActions.StoreAuthType>
	) {
		super()
		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	public override ngOnInit() {
		super.ngOnInit()

		merge(...[
			this._listenersService.onListenRouterNavigation().pipe(
				filter(el => el instanceof NavigationEnd),
				tap((el) => {
					this.loaderState$.next(new LoaderModel(false, false))
				})
			),
			this.requestRefresher$.pipe(take(1), startWith("initial"))
		]).pipe(
			filter(el => el == "initial" || el instanceof NavigationEnd),
			switchMap((el) => this.onValidateArchivatedStatus()),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public onRefreshPage() {
		this.requestRefresher$.next()
	}

	private onValidateArchivatedStatus() {
		return this.authAuditorState$
			.pipe(
				filter(el => !!el.activeCompany),
				take(1),
				switchMap((el2) => this._myCompaniesService
					.onGetArchivatedCompanyStatus(el2.activeCompany?.CompanyId ?? -1)
					.pipe(
						tap((el) => {
							let activeCompanyState = {...el2.activeCompany}
							let newAuthState = {...el2}

							if (activeCompanyState) {
								activeCompanyState.CompanyArchivated! = el.Data.isArchivated
								newAuthState.activeCompany = activeCompanyState as any
							}

							this._store.dispatch(AuthActions.AuthAuditorPatch(newAuthState))
							this.loaderState$.next(new LoaderModel(true, false))
						}),

						catchError(async (err) => {
							this.loaderState$.next(new LoaderModel(true, true))
						})
					)
				)
			)
	}
}
