import {AsyncPipe} from "@angular/common"
import {Component} from "@angular/core"
import {MatProgressBarModule} from "@angular/material/progress-bar"
import {
	NavigationCancel,
	NavigationEnd,
	NavigationStart,
	RouteConfigLoadEnd,
	RouteConfigLoadStart,
	RouterOutlet
} from "@angular/router"
import {LifeHooksFactory, NgxToastrModule} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, filter, takeUntil, tap} from "rxjs"
import {frameSideInOut2} from "../addons/animations/shared.animations"
import {fullScreenLoaderAnimation} from "../addons/components/dots-loader/animations"
import {FullScreenLoaderModule} from "../addons/components/full-screen-loader/full-screen-loader.module"
import {NgShortMessageModule} from "../addons/components/ng-materials/ng-short-message/ng-short-message.module"
import {ViewportOverlayModule} from "../addons/components/viewport-overlay/viewport-overlay.module"
import {ListenersService} from "../addons/services/listeners.service"
import * as AuthActions from "./store/actions/auth.actions"
import {StoreAuthType} from "./store/actions/auth.actions"
import * as LocalStorageActions from "./store/actions/localstorage.actions"
import {AuthListeners} from "./store/listeners/auth.listeners"
import {LOCAL_STORAGE_TOKEN_KEY, SyncStorageModel} from "./store/models/localstorage/models"

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		NgxToastrModule,
		ViewportOverlayModule,
		NgShortMessageModule,
		MatProgressBarModule,
		AsyncPipe,
		FullScreenLoaderModule
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [
		frameSideInOut2,
		fullScreenLoaderAnimation
	]
})
export class AppComponent extends LifeHooksFactory {
	public readonly isLoadingChunks$ = new BehaviorSubject<boolean>(false)
	public readonly isLoadingInterface$ = new BehaviorSubject<boolean>(false)
	public readonly authAuditorState$
	public readonly logoutAuditorState$

	constructor(
		private _listenersService: ListenersService,
		private _authListeners: AuthListeners,
		private _store: Store<LocalStorageActions.LocalStorageOperations & StoreAuthType>
	) {
		super()

		this.authAuditorState$ = this._authListeners.authAuditorState$
		this.logoutAuditorState$ = this._authListeners.storeLogoutState$

		this._store.dispatch(LocalStorageActions.SyncStorageByKeys(new SyncStorageModel([LOCAL_STORAGE_TOKEN_KEY])))
		this._store.dispatch(LocalStorageActions.StorageStateFetchInit())
		this._store.dispatch(AuthActions.AuthAuditorInit())
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._listenersService.onListenRouterNavigation()
			.pipe(
				filter(el =>
					el instanceof RouteConfigLoadStart ||
					el instanceof RouteConfigLoadEnd ||
					el instanceof NavigationStart ||
					el instanceof NavigationEnd ||
					el instanceof NavigationCancel
				),
				tap(el => {
					if (el instanceof RouteConfigLoadStart || el instanceof RouteConfigLoadEnd) {
						this.isLoadingChunks$.next(el instanceof RouteConfigLoadStart)
					}

					const regexp = /^([^?]*\/interface)(\/|$)/

					if (el instanceof NavigationStart && regexp.test(el.url)) {
						this.isLoadingInterface$.next(true)
					}

					if (el instanceof NavigationEnd || el instanceof NavigationCancel && regexp.test(el.url)) {
						this.isLoadingInterface$.next(false)
					}
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}
}
