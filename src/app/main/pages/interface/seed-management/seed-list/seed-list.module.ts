import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule} from "@fixAR496/ngx-elly-lib"
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
import {CustomPipesModule} from "../../../../../../addons/pipes/custom.pipes.module"
import {RoutesExtended} from "../../../../../../addons/states/states"
import {SeedListComponent} from "./seed-list.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: SeedListComponent
	}
]

@NgModule({
	declarations: [SeedListComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxIconsModule,
		CustomRaisedButtonModule,
		CustomBasicButtonModule,
		CustomBasicLinkModule,
		CustomInputModule,
		CustomInputFieldModule,
		CustomPipesModule,

		NgxGridLayoutModule,
		MatRippleModule,
		DotsLoaderModule
	]
})
export class SeedListModule {
}
