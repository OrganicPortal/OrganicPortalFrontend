import {animate, style, transition, trigger} from "@angular/animations"
import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, filter, map, merge, shareReplay, startWith, switchMap, take, takeUntil, tap} from "rxjs"
import {
	frameSideIn2,
	frameSideInOut2,
	frameSideInOut4,
	frameSideOut2
} from "../../../../addons/animations/shared.animations"
import {ListenersService} from "../../../../addons/services/listeners.service"
import {RoutesReservedQueryParams} from "../../../../addons/states/routes-redirects.service"

@Component({
	selector: "app-auth",
	standalone: false,
	templateUrl: "./auth.component.html",
	styleUrl: "./auth.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn2,
		frameSideInOut2,
		frameSideInOut4,

		trigger("frameSideOut2", [
			transition(":leave", [
				style("*"),
				animate(".4s ease", style({opacity: 0}))
			])
		])
	]
})
export class AuthComponent extends LifeHooksFactory {
	public readonly isVisibleLocationBack$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _listenersService: ListenersService
	) {
		super()
	}

	@HostBinding("@frameSideIn2")
	@HostBinding("@frameSideOut2")
	override ngOnInit() {
		super.ngOnInit()

		/**
		 * Відображає кнопку для повернення на стейдж назад
		 * в залежності від налаштувань маршруту
		 */
		this._listenersService.onListenRouterNavigation()
			.pipe(
				startWith("init"),
				filter(el => el instanceof NavigationEnd || el === "init"),
				map(() => this._activatedRoute.children.map(el => el.data)),
				switchMap((el) => merge(...el).pipe(take(1))),
				tap((el) => {
					const data = el as any
					this.isVisibleLocationBack$.next(!!data?.allowToGoBack)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	override ngOnDestroy() {
		super.ngOnDestroy()
	}

	public onGetRedirectKey() {
		return RoutesReservedQueryParams.redirectAfterClose
	}

	public onGetRouteQueryParams() {
		return this._activatedRoute.queryParams
			.pipe(shareReplay())
	}

	public onLocationBack() {
		window.history.back()
	}
}
