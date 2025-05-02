import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../../../addons/states/states"
import {InterfaceComponent} from "./interface.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: InterfaceComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyAuthorized
					]
				}
			},

			{
				path: "**",
				redirectTo: "",
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
