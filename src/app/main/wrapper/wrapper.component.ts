import {ChangeDetectionStrategy, Component, ElementRef} from "@angular/core"
import {NavigationEnd} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {filter, takeUntil, tap} from "rxjs"
import {ListenersService} from "../../../addons/services/listeners.service"
import {AuthListeners} from "../../store/listeners/auth.listeners"
import {WrapperService} from "./wrapper.service"

@Component({
	selector: "app-wrapper",
	standalone: false,
	templateUrl: "./wrapper.component.html",
	styleUrl: "./wrapper.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent extends LifeHooksFactory {
	public authAuditorState$
	constructor(
		private _listenersService: ListenersService,
		private _authListeners: AuthListeners,
	) {
		super()

		this.authAuditorState$ = this._authListeners.authAuditorState$
	}

	override ngOnInit() {
		super.ngOnInit()

		this._listenersService.onListenRouterNavigation()
			.pipe(
				filter(el => el instanceof NavigationEnd),
				tap(() => window.scroll({behavior: "auto", top: 0})),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}
}
