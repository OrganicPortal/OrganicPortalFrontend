import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {ReactiveFormsModule} from "@angular/forms"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../addons/components/error-loading/error-loading.module"
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
import {CompaniesListComponent} from "./companies-list.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: CompaniesListComponent
	}
]


@NgModule({
	declarations: [
		CompaniesListComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CustomBasicButtonModule,
		MatRippleModule,
		NgxIconsModule,

		CustomInputModule,
		CustomRaisedButtonModule,
		CustomBasicLinkModule,
		CustomBasicButtonModule,
		CustomInputFieldModule,

		MatRippleModule,
		ReactiveFormsModule,
		ErrorLoadingModule,
		NgxGridLayoutModule,
		CustomPipesModule,
		DotsLoaderModule
	]
})
export class CompaniesListModule {
}
