import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomInputFieldModule} from "../../../../addons/components/custom-input-field/custom-input-field.module"
import {DotsLoaderModule} from "../../../../addons/components/dots-loader/dots-loader.module"
import {CustomBasicButtonModule} from "../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomInputModule} from "../../../../addons/directives/inputs/custom-input/custom-input.module"
import {CustomBasicLinkModule} from "../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {RoutesExtended} from "../../../../addons/states/states"
import {MyProfileComponent} from "./my-profile.component"
import {MyProfileService} from "./my-profile.service"
import {SharedModule} from "./shared/shared.module"

export const routes: RoutesExtended = [
	{
		path: "",
		component: MyProfileComponent,

		children: [
			{
				path: "",
				loadChildren: () => import("./personal-info/personal-info.module").then(x => x.PersonalInfoModule)
			},

			{
				path: "personal-companies",
				loadChildren: () => import("./personal-companies/personal-companies.module").then(x => x.PersonalCompaniesModule)
			}
		]
	},

	{
		path: "**",
		redirectTo: "",
		pathMatch: "full"
	}
]

@NgModule({
	declarations: [MyProfileComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		NgOptimizedImage,
		SharedModule,
		DotsLoaderModule
	]

})
export class MyProfileModule {
}
