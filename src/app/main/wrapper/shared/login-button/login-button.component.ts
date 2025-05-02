import {Component, Input} from "@angular/core"
import {Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, takeUntil, tap} from "rxjs"
import {RoutesReservedQueryParams} from "../../../../../addons/states/states"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"

@Component({
	selector: "login-button",

	templateUrl: "./login-button.component.html",
	styleUrl: "./login-button.component.scss",
	standalone: false
})
export class LoginButtonComponent extends LifeHooksFactory {
	public viewOnState: "navbar" | "header" = "header"
	public readonly isAuthUser$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _router: Router,
		private _authListeners: AuthListeners
	) {
		super()
	}

	@Input() public set viewOn(value: "navbar" | "header") {
		this.viewOnState = value
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._authListeners.authAuditorState$
			.pipe(
				tap((el) => {
					this.isAuthUser$.next(el.isAuthUser)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
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
