import {Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, takeUntil, tap} from "rxjs"
import {frameSideInOut2} from "../../addons/animations/shared.animations"
import {ListenersService} from "../../addons/services/listeners.service"
import {AuthListeners} from "../store/listeners/auth.listeners"

@Component({
	selector: "app-main",
	standalone: false,
	templateUrl: "./main.component.html",
	styleUrl: "./main.component.scss",
	animations: [
		frameSideInOut2
	]
})
export class MainComponent extends LifeHooksFactory {
	public readonly isLoadingChunks$ = new BehaviorSubject<boolean>(false)
	public readonly isAuthFetchSuccess$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _listenersService: ListenersService,
		private _authListeners: AuthListeners
	) {
		super()
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._authListeners.authAuditorState$
			.pipe(
				tap((el) => {
					this.isAuthFetchSuccess$.next(el.isFetchSuccess)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}
}
