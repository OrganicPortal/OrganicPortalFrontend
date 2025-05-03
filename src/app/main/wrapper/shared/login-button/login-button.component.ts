import {animate, style, transition, trigger} from "@angular/animations"
import {CdkMenuTrigger} from "@angular/cdk/menu"
import {ConnectionPositionPair} from "@angular/cdk/overlay"
import {ChangeDetectionStrategy, Component, Input, ViewChild} from "@angular/core"
import {Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, takeUntil, tap} from "rxjs"
import {RoutesReservedQueryParams} from "../../../../../addons/states/states"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"
import {WrapperService} from "../../wrapper.service"


@Component({
	selector: "login-button",
	templateUrl: "./login-button.component.html",
	styleUrl: "./login-button.component.scss",
	standalone: false,
	animations: [
		trigger("childMenuSideIn", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(-10px) scale(.9)"
				}),

				animate(".2s ease", style("*"))
			]),

			transition(":leave", [
				style("*"),

				animate(".2s ease", style({
					opacity: 0,
					transform: "translateX(-10px) scale(.9)"
				}))
			])
		])
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginButtonComponent extends LifeHooksFactory {
	public viewOnState: "navbar" | "header" = "header"
	public readonly isAuthUser$ = new BehaviorSubject<boolean>(false)

	public readonly menuPosition = [
		new ConnectionPositionPair(
			{originX: "end", originY: "bottom"},
			{overlayX: "start", overlayY: "top"},
			undefined,
			2
		)
	]

	@ViewChild(CdkMenuTrigger) menu!: CdkMenuTrigger

	constructor(
		private _router: Router,
		private _wrapperService: WrapperService,
		private _authListeners: AuthListeners,
		private _store: Store<AuthActions.StoreAuthType>
	) {
		super()
	}

	@Input() public set viewOn(value: "navbar" | "header") {
		this.viewOnState = value
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._wrapperService.onListenScrollableEvents()
			.pipe(
				tap((el) => {
					if (this.menu?.isOpen())
						this.menu?.close()
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this._authListeners.authAuditorState$
			.pipe(
				tap((el) => {
					this.isAuthUser$.next(el.isAuthUser)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onLogout() {
		this._store.dispatch(AuthActions.LogoutInit())
	}

	public onNavigateToLogin() {
		this._router.navigate([{outlets: {"auth-overlay": ["auth-overlay"]}}], {
			skipLocationChange: true,
			queryParams: {
				[RoutesReservedQueryParams.redirectAfterClose]: this._router.url
			}
		})
	}
}
