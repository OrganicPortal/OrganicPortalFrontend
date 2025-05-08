import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {DotsLoaderModule} from "../../../../../addons/components/dots-loader/dots-loader.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {MyProfileComponent} from "./my-profile.component"
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
