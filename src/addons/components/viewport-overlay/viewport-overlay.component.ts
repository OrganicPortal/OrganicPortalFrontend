import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {frameSideInOut2} from "../../animations/shared.animations"
import {ViewportOverlayService} from "./viewport-overlay.service"

@Component({
	selector: "viewport-overlay",
	standalone: false,
	templateUrl: "./viewport-overlay.component.html",
	styleUrl: "./viewport-overlay.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideInOut2
	]
})
export class ViewportOverlayComponent extends LifeHooksFactory {
	constructor(
		private _viewportOverlayService: ViewportOverlayService
	) {
		super()
	}

	public get overlayState$() {
		return this._viewportOverlayService.overlayState$
	}

	override ngOnInit() {
		super.ngOnInit()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
	}
}
