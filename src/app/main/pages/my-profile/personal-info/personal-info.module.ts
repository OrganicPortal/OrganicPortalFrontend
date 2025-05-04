import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule, NgxPipesModule} from "@fixAR496/ngx-elly-lib"
import {CustomInputFieldModule} from "../../../../../addons/components/custom-input-field/custom-input-field.module"
import {
	CustomBasicButtonModule
} from "../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomInputModule} from "../../../../../addons/directives/inputs/custom-input/custom-input.module"
import {CustomBasicLinkModule} from "../../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SharedModule} from "../shared/shared.module"
import {PersonalInfoComponent} from "./personal-info.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: PersonalInfoComponent,
		data: {
			title: "Особисті дані",
			icon: "text-field-focus"
		}
	}
]

@NgModule({
	declarations: [
		PersonalInfoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,

		FormsModule,
		ReactiveFormsModule,
		NgxGridLayoutModule,

		NgxPipesModule
	]
})
export class PersonalInfoModule {
}
