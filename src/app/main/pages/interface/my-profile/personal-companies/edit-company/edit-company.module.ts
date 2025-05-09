import {CommonModule, DatePipe} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatTooltipModule} from "@angular/material/tooltip"
import {RouterModule} from "@angular/router"
import {
	CustomDropdownFieldModule
} from "../../../../../../../addons/components/custom-dropdown-field/custom-dropdown-field.module"
import {DotsLoaderModule} from "../../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../../addons/components/error-loading/error-loading.module"
import {NgCheckboxModule} from "../../../../../../../addons/components/ng-materials/ng-checkbox/ng-checkbox.module"
import {RoutesExtended} from "../../../../../../../addons/states/states"

import {SharedModule} from "../../shared/shared.module"
import {EditCompanyComponent} from "./edit-company.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: EditCompanyComponent
	}
]

@NgModule({
	declarations: [EditCompanyComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ErrorLoadingModule,
		SharedModule,
		DotsLoaderModule,
		CustomDropdownFieldModule,
		FormsModule,
		ReactiveFormsModule,
		NgCheckboxModule,
		MatTooltipModule
	],
	providers: [DatePipe]
})
export class EditCompanyModule {
}
