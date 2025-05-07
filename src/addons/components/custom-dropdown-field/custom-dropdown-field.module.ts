import {CdkMenuModule} from "@angular/cdk/menu"
import {OverlayModule} from "@angular/cdk/overlay"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {NgxIconsModule, SafeHtmlPipe} from "@fixAR496/ngx-elly-lib"
import {CustomPipesModule} from "../../pipes/custom.pipes.module"
import {CustomDropdownFieldComponent} from "./custom-dropdown-field.component"
import {CustomDropdownFieldService} from "./custom-dropdown-field.service"
import {CustomSelectionMenuComponent} from "./custom-selection-menu/custom-selection-menu.component"
import {CustomSelectionOptionComponent} from "./custom-selection-option/custom-selection-option.component"
import { ScrollingModule } from "@angular/cdk/scrolling"


@NgModule({
	declarations: [
		CustomDropdownFieldComponent,
		CustomSelectionMenuComponent,
		CustomSelectionOptionComponent
	],
	exports: [
		CustomDropdownFieldComponent,
		CustomSelectionMenuComponent,
		CustomSelectionOptionComponent
	],
	imports: [
		CommonModule,
		NgxIconsModule,
		MatRippleModule,

		CdkMenuModule,
		OverlayModule,
		ScrollingModule,
		CustomPipesModule,
		SafeHtmlPipe
	],
})
export class CustomDropdownFieldModule {
}
