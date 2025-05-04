import {Clipboard, ClipboardModule} from "@angular/cdk/clipboard"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {ClipboardTextContainerComponent} from "./clipboard-text-container.component"

@NgModule({
	declarations: [ClipboardTextContainerComponent],
	exports: [ClipboardTextContainerComponent],
	imports: [
		CommonModule,
		MatRippleModule,
		ClipboardModule,
		NgxIconsModule
	],

	providers: [
		Clipboard
	]
})
export class ClipboardTextContainerModule {
}
