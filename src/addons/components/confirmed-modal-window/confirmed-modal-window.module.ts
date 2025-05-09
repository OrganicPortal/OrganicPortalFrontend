import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatRippleModule} from "@angular/material/core"
import {MatTooltipModule} from "@angular/material/tooltip"
import {NgxIconsModule, SafeHtmlPipe} from "@fixAR496/ngx-elly-lib"
import {CustomBasicButtonModule} from "../../directives/buttons/custom-basic-button/custom-button.module"
import {CustomRaisedButtonModule} from "../../directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomPipesModule} from "../../pipes/custom.pipes.module"
import {NgLayoutsModule} from "../ng-materials/ng-layouts/ng-layouts.module"
import {ConfirmedModalCardComponent} from "./confirmed-modal-card/confirmed-modal-card.component"
import {ConfirmedModalWindowComponent} from "./confirmed-modal-window.component"


@NgModule({
	declarations: [
		ConfirmedModalWindowComponent,
		ConfirmedModalCardComponent
	],
	exports: [
		ConfirmedModalWindowComponent
	],
	imports: [
		CommonModule,
		CustomBasicButtonModule,
		CustomRaisedButtonModule,
		ReactiveFormsModule,
		FormsModule,
		NgxIconsModule,

		NgLayoutsModule,
		CustomPipesModule,
		MatTooltipModule,
		MatRippleModule,
		SafeHtmlPipe
	]
})
export class ConfirmedModalWindowModule {
}
