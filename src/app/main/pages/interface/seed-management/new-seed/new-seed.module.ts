import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	CustomDropdownFieldModule
} from "../../../../../../addons/components/custom-dropdown-field/custom-dropdown-field.module"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../addons/components/error-loading/error-loading.module"
import {NgCheckboxModule} from "../../../../../../addons/components/ng-materials/ng-checkbox/ng-checkbox.module"
import {NgTitleModule} from "../../../../../../addons/components/ng-materials/ng-title/ng-title.module"
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
import {NewSeedComponent} from "./new-seed.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: NewSeedComponent
	}
]

@NgModule({
	declarations: [
		NewSeedComponent
	],
	imports: [
		CommonModule,
		NgxIconsModule,
		CustomRaisedButtonModule,
		CustomBasicButtonModule,
		CustomBasicLinkModule,
		CustomInputModule,
		CustomInputFieldModule,
		CustomPipesModule,

		NgxGridLayoutModule,
		ReactiveFormsModule,
		CustomDropdownFieldModule,

		RouterModule.forChild(routes),
		ErrorLoadingModule,
		DotsLoaderModule,
		NgCheckboxModule,
		NgTitleModule
	]
})
export class NewSeedModule {
}
