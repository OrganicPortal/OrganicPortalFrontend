import {CommonModule, DatePipe} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
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
import {DateTimePipe} from "../../../../../../addons/pipes/datetime.pipe"
import {RoutesExtended} from "../../../../../../addons/states/states"
import {SeedManagementService} from "../seed-management.service"
import {EditSeedComponent} from "./edit-seed.component"
import {
	ViewSeedCertificationModalComponent
} from "./view-seed-certification-modal/view-seed-certification-modal.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: EditSeedComponent
	}
]

@NgModule({
	declarations: [
		ViewSeedCertificationModalComponent,
		EditSeedComponent
	],
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
		ReactiveFormsModule,
		CustomDropdownFieldModule,
		ErrorLoadingModule,
		DotsLoaderModule,
		NgCheckboxModule,
		NgTitleModule,

		FormsModule
	],
	providers: [
		SeedManagementService,
		DateTimePipe,
		DatePipe
	]
})
export class EditSeedModule {
}
