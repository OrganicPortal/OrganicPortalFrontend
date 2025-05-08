import {CommonModule, DatePipe} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {
	CustomDropdownFieldModule
} from "../../../../../../../addons/components/custom-dropdown-field/custom-dropdown-field.module"
import {DotsLoaderModule} from "../../../../../../../addons/components/dots-loader/dots-loader.module"
import {NgCheckboxModule} from "../../../../../../../addons/components/ng-materials/ng-checkbox/ng-checkbox.module"
import {RoutesExtended} from "../../../../../../../addons/states/states"
import {SharedModule} from "../../shared/shared.module"
import {CreateCompanyComponent} from "./create-company.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: CreateCompanyComponent
	}
]

@NgModule({
	declarations: [
		CreateCompanyComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ReactiveFormsModule,
		FormsModule,
		NgCheckboxModule,
		CustomDropdownFieldModule,
		DotsLoaderModule
	],

	providers: [DatePipe]
})
export class CreateCompanyModule {
}
