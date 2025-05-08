import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {
	CustomBasicButtonModule
} from "../../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomInputModule} from "../../../../../../addons/directives/inputs/custom-input/custom-input.module"
import {
	CustomBasicLinkModule
} from "../../../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {CustomPipesModule} from "../../../../../../addons/pipes/custom.pipes.module"

@NgModule({
	exports: [
		NgxIconsModule,
		CustomRaisedButtonModule,
		CustomBasicButtonModule,
		CustomBasicLinkModule,
		CustomInputModule,
		CustomInputFieldModule,
		CustomPipesModule,

		MatRippleModule
	]
})
export class SharedModule {
}
