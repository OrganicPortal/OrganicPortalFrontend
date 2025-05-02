import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
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
import {RoutesExtended} from "../../../../../../addons/states/states"
import {AuthLogoModule} from "../../auth-logo/auth-logo.module"
import {RecoveryInitComponent} from "./recovery-init.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: RecoveryInitComponent
	}
]

@NgModule({
	declarations: [RecoveryInitComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		FormsModule,
		ReactiveFormsModule,

		CustomBasicButtonModule,
		CustomBasicLinkModule,
		CustomInputFieldModule,
		CustomInputModule,
		CustomRaisedButtonModule,

		MatRippleModule,
		AuthLogoModule,
		NgxIconsModule,
		DotsLoaderModule
	]

})
export class RecoveryInitModule {
}
