import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../../../addons/states/states"
import {InterfaceComponent} from "./interface.component"
import {SeedManagementModule} from "./seed-management/seed-management.module"

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
				path: "seed-management",
				loadChildren: () => import("./seed-management/seed-management.module").then(m => m.SeedManagementModule),
			},


			{
				path: "seed-certification",
				loadChildren: () => import("./seed-certification/seed-certification.module").then(m => m.SeedCertificationModule),
			},
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
