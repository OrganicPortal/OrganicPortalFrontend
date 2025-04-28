import {Component, Input} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {ListenersService} from "../../../../../addons/services/listeners.service"
import {RoutesReservedQueryParams} from "../../../../../addons/states/routes-redirects.service"

@Component({
	selector: "login-button",

	templateUrl: "./login-button.component.html",
	styleUrl: "./login-button.component.scss",
	standalone: false
})
export class LoginButtonComponent {
	public viewOnState: "navbar" | "header" = "header"

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _listenersService: ListenersService
	) {
	}

	@Input() public set viewOn(value: "navbar" | "header") {
		this.viewOnState = value
	}

	ngOnInit() {
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
