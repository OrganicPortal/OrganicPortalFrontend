import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Subject, switchMap, take, takeUntil, tap} from "rxjs"
import {frameSideIn2} from "../../../../../addons/animations/shared.animations"
import {RoutesRedirects} from "../../../../../addons/states/routes-redirects.service"

@Component({
	selector: "app-auth-overlay",
	templateUrl: "./auth-overlay.component.html",
	styleUrl: "./auth-overlay.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: [
		frameSideIn2
	]
})

// Used to smoothly animate transitions between main level routes
export class AuthOverlayComponent extends LifeHooksFactory {
	private readonly animationHandler$ = new Subject<void>()

	constructor(
		private _router: Router,
		private _elem: ElementRef<HTMLElement>,
		private _activatedRoute: ActivatedRoute
	) {
		super()
	}

	@HostBinding("@frameSideIn2")
	override ngOnInit() {
		super.ngOnInit()

		this.animationHandler$
			.pipe(
				switchMap(() => this._activatedRoute.queryParams),
				tap((el) => {
					const params = new URLSearchParams(el).toString()

					this._router.navigateByUrl(`${RoutesRedirects.login}?${params}`)
				}),
				takeUntil(this.componentDestroy$),
				take(1)
			).subscribe()
	}

	@HostListener("@frameSideIn2.done")
	private onDoneHostAnimation() {
		this.animationHandler$.next()
	}
}
