import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {shareReplay} from "rxjs"
import {frameSideIn2, frameSideOut2} from "../../../../addons/animations/shared.animations"
import {RoutesReservedQueryParams} from "../../../../addons/states/routes-redirects.service"

@Component({
	selector: "app-auth",
	standalone: false,
	templateUrl: "./auth.component.html",
	styleUrl: "./auth.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn2,
		frameSideOut2
	]
})
export class AuthComponent extends LifeHooksFactory {
	constructor(
		private _activatedRoute: ActivatedRoute
	) {
		super()
	}

	@HostBinding("@frameSideIn2")
	@HostBinding("@frameSideOut2")
	override ngOnInit() {
		super.ngOnInit()
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
}
