import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {UserGroupsGuardService} from "../../../../addons/guards/user-groups.guard.service"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../../../addons/states/states"
import {InterfaceComponent} from "./interface.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: InterfaceComponent,
		children: [
			{
				path: "my-profile",
				loadChildren: () => import("./my-profile/my-profile.module").then(m => m.MyProfileModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyAuthorized
					]
				}
			},

			{
				path: "seed-management",
				loadChildren: () => import("./seed-management/seed-management.module").then(m => m.SeedManagementModule)
			},

			{
				path: "**",
				redirectTo: "my-profile",
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
