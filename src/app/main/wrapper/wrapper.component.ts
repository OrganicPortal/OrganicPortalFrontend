import {ChangeDetectionStrategy, Component} from "@angular/core"
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, filter, takeUntil, tap} from "rxjs"
import {ListenersService} from "../../../addons/services/listeners.service"
import {AuthListeners} from "../../store/listeners/auth.listeners"

@Component({
	selector: "app-wrapper",
	standalone: false,
	templateUrl: "./wrapper.component.html",
	styleUrl: "./wrapper.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent extends LifeHooksFactory {
	public authAuditorState$
	public isActiveInterface$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _listenersService: ListenersService,
		private _authListeners: AuthListeners,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {
		super()

		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	override ngOnInit() {
		super.ngOnInit()

		this.onValidateInterfaceRoute(this._router.url)

		this._listenersService.onListenRouterNavigation()
			.pipe(
				tap((el) => {
					this.onValidateInterfaceRoute(this._router.url)
				}),
				filter(el => el instanceof NavigationEnd),
				tap(() => window.scroll({behavior: "auto", top: 0})),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	private onValidateInterfaceRoute(url: string) {
		const includeStr = "/interface"

		const state = url.toLowerCase()
			.includes(includeStr)

		this.isActiveInterface$.next(state)
	}
}
