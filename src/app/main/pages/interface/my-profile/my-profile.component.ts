import {BreakpointState} from "@angular/cdk/layout"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {filter, Observable, takeUntil, tap} from "rxjs"
import {frameSideIn4, frameSideInOut2} from "../../../../../addons/animations/shared.animations"
import {LoaderModel} from "../../../../../addons/models/models"
import {BreakpointsService, CustomBreakpoints} from "../../../../../addons/services/breakpoints.service"
import {MyProfileService} from "./my-profile.service"
import * as AuthActions from "../../../../store/actions/auth.actions"

@Component({
	selector: "app-my-profile",
	standalone: false,
	templateUrl: "./my-profile.component.html",
	styleUrls: [
		"./my-profile.component.scss",
		"./shared/shared.styles.scss"
	],
	animations: [
		frameSideIn4,
		frameSideInOut2
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileComponent extends LifeHooksFactory {
	public readonly breakPointForMw850$: Observable<BreakpointState>
	constructor(
		public _myProfileService: MyProfileService,
		private _breakpointsService: BreakpointsService,
		private _store: Store<AuthActions.StoreAuthType>
	) {
		super()
		this.breakPointForMw850$ = this._breakpointsService.onListenBreakpoint(CustomBreakpoints.mw850)
	}

	public get loaderState$() {
		return this._myProfileService.loaderState$
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._myProfileService
			.onGetProfileHandler()
			.pipe(takeUntil(this.componentDestroy$))
			.subscribe()

		this._myProfileService.profileData$
			.pipe(
				filter(el => !!el),
				tap((el) => {
					this._store.dispatch(AuthActions.AuthAuditorPatch({
						userInfo: el?.Data
					}))
				}),
				takeUntil(this.componentDestroy$)
			)
			.subscribe()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this.loaderState$.next(new LoaderModel(false, false))
		this._myProfileService.profileData$.next(undefined)
	}

	public onLogout() {
		this._store.dispatch(AuthActions.LogoutInit())
	}
}
