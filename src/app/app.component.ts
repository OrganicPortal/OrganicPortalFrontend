import {Component} from "@angular/core"
import {RouterOutlet} from "@angular/router"
import {NgxToastrModule, ToastrService} from "@fixAR496/ngx-elly-lib"
import {ViewportOverlayModule} from "../addons/components/viewport-overlay/viewport-overlay.module"

@Component({
	selector: "app-root",
	imports: [RouterOutlet, NgxToastrModule, ViewportOverlayModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: []
})
export class AppComponent {

	constructor(private _toastrService: ToastrService) {
	}
}
