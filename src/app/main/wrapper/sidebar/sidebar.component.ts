import {Breakpoints, BreakpointState} from "@angular/cdk/layout"
import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Renderer2} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, map, Observable, takeUntil, tap} from "rxjs"
import {frameSideIn5} from "../../../../addons/animations/shared.animations"
import {BreakpointsService, CustomBreakpoints} from "../../../../addons/services/breakpoints.service"
import * as AuthActions from "../../../store/actions/auth.actions"
import {AuthListeners} from "../../../store/listeners/auth.listeners"
import {WrapperService} from "../wrapper.service"

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrl: "./sidebar.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn5
	]
})
export class SidebarComponent extends LifeHooksFactory {
	public readonly links: SidebarLinkModel[] = [
		new SidebarLinkModel("Change company", "route", "/interface/my-profile/personal-companies"),
		new SidebarLinkModel("Product Management", "link", "/interface/seed-management")
		// new SidebarLinkModel("Сертифікація продукції", "diploma", "/interface/seed-certification")
	]

	public authAuditorState$
	public readonly isOpenedSidebar$ = new BehaviorSubject<boolean>(false)
	public readonly breakPointForMw850$: Observable<BreakpointState>

	public breakPointForXSmall$: Observable<BreakpointState>

	constructor(
		private _authListeners: AuthListeners,
		private _wrapperService: WrapperService,
		private _renderer2: Renderer2,
		private _elem: ElementRef<HTMLElement>,
		private _breakpointsService: BreakpointsService,
		private _store: Store<AuthActions.StoreAuthType>
	) {
		super()
		this.authAuditorState$ = this._authListeners.authAuditorState$
		this.breakPointForXSmall$ = this._breakpointsService.onListenBreakpoint(Breakpoints.XSmall)
		this.breakPointForMw850$ = this._breakpointsService.onListenBreakpoint(CustomBreakpoints.mw850)

		this._wrapperService.isOpenedSidebar$.next(this.isOpenedSidebar$.getValue())
	}

	@HostBinding("class")
	public get sidebarState() {
		return this.isOpenedSidebar$.pipe(
			map(el => el ? "opened-sidebar" : "closed-sidebar")
		)
	}

	public override ngOnInit() {
		super.ngOnInit()

		this.isOpenedSidebar$.pipe(
			tap((el) => {
				const elem = this._elem.nativeElement

				if (el) {
					this._renderer2.addClass(elem, "sidebar-is-opened")
					return
				}

				this._renderer2.removeClass(elem, "sidebar-is-opened")
			}),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()

		this._wrapperService.isOpenedSidebar$.next(false)
	}

	public onClickToLink(isXsAdaptive: boolean) {
		if (!isXsAdaptive)
			return

		this.isOpenedSidebar$.next(false)
		this._wrapperService.isOpenedSidebar$.next(false)
	}

	public onHandleSidebarState(currState: boolean) {
		this.isOpenedSidebar$.next(!currState)
		this._wrapperService.isOpenedSidebar$.next(!currState)
	}

	public onLogout() {
		this._store.dispatch(AuthActions.LogoutInit())
	}
}

export class SidebarLinkModel {
	name: string
	icon: string
	redirectTo: string


	constructor(name: string, icon: string, redirectTo: string) {
		this.name = name
		this.icon = icon
		this.redirectTo = redirectTo
	}
}
