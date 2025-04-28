import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {ViewportOverlayComponent} from "./viewport-overlay.component"


@NgModule({
	declarations: [ViewportOverlayComponent],
	exports: [ViewportOverlayComponent],
	imports: [
		CommonModule
	]
})
export class ViewportOverlayModule {
}
