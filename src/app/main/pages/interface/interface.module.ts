import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../addons/states/states"
import {InterfaceComponent} from "./interface.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: InterfaceComponent,
		children: [
			// {
			// 	path: "",
			// 	loadChildren: () => import("./../my-profile/my-profile.module").then(m => m.MyProfileModule),
			// 	data: {
			// 		canActivateGroups: [
			// 			AllowedGroupsOfUsers.OnlyAuthorized
			// 		]
			// 	}
			// },

			{
				path: "seed-management",
				loadChildren: () => import("./seed-management/seed-management.module").then(m => m.SeedManagementModule)
			},

			{
				path: "**",
				redirectTo: "seed-management",
				pathMatch: "full"
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
	declarations: [InterfaceComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class InterfaceModule {
}
