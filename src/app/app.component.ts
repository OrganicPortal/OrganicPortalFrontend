import {Component} from "@angular/core"
import {RouterOutlet} from "@angular/router"
import {NgxToastrModule} from "@fixAR496/ngx-elly-lib"
import {NgShortMessageModule} from "../addons/components/ng-materials/ng-short-message/ng-short-message.module"
import {ViewportOverlayModule} from "../addons/components/viewport-overlay/viewport-overlay.module"

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		NgxToastrModule,
		ViewportOverlayModule,
		NgShortMessageModule
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: []
})
export class AppComponent {

	constructor() {
	}
}
