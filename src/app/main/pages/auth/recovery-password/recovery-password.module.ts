import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {UserGroupsGuardService} from "../../../../../addons/guards/user-groups.guard.service"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../../../../addons/states/states"
import {RecoveryPasswordComponent} from "./recovery-password.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: RecoveryPasswordComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./recovery-init/recovery-init.module").then(x => x.RecoveryInitModule)
			},

			{
				path: "recovery-in-progress",
				loadChildren: () => import("./recovery-in-progress/recovery-in-progress.module").then(x => x.RecoveryInProgressModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyWithInitPassRecovery
					],

					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyWithInitPassRecovery]: {
							redirectTo: ["/auth/recovery"]
						}
					}
				}
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
	declarations: [
		RecoveryPasswordComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class RecoveryPasswordModule {
}
