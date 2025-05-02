import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	CustomRaisedButtonModule
} from "../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {UserGroupsGuardService} from "../../../../addons/guards/user-groups.guard.service"
import {AllowedGroupsOfUsers, RouterRedirects, RoutesExtended} from "../../../../addons/states/states"
import {AuthComponent} from "./auth.component"
import {AuthService} from "./auth.service"

export enum CodeConfirmation {
	isRegSuccessful = "isRegSuccessful",
}

export const routes: RoutesExtended = [
	{
		path: "",
		component: AuthComponent,

		children: [
			{
				path: "login",
				loadChildren: () => import("./login/login.module").then(x => x.LoginModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyUnauthorized
					],

					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyUnauthorized]: {
							redirectTo: ["/interface"]
						}
					}
				}
			},

			{
				path: "registration",
				loadChildren: () => import("./registration/registration.module").then((m) => m.RegistrationModule),
				canActivate: [UserGroupsGuardService],
				runGuardsAndResolvers: "always",
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyUnauthorized
					],

					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyUnauthorized]: {
							redirectTo: ["/interface"]
						}
					}
				}
			},

			{
				path: "code-confirmation",
				loadChildren: () => import("./code-confirmation/code-confirmation.module").then(x => x.CodeConfirmationModule),
				canActivate: [UserGroupsGuardService],
				data: {
					allowToGoBack: true,
					pageTitle: "Підтвердженя номера телефону",
					confirmationType: "registration",
					pageDesc: "Для завершення реєстрації, будь ласка, введіть код підтвердження, надісланий на ваш номер телефону.",
					backUrl: RouterRedirects.registration,

					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyWithConfirmRegistrationStep
					],

					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyWithConfirmRegistrationStep]: {
							redirectTo: [RouterRedirects.registration]
						}
					}
				}
			},

			{
				path: "recovery",
				loadChildren: () => import("./recovery-password/recovery-password.module").then((m) => m.RecoveryPasswordModule),
				canActivate: [UserGroupsGuardService],
				data: {
					allowToGoBack: true,
					backUrl: RouterRedirects.login,

					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyUnauthorized
					],

					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyUnauthorized]: {
							redirectTo: [RouterRedirects.registration]
						}
					}
				}
			},

			{
				path: "**",
				redirectTo: "login",
				pathMatch: "full"
			}
		]
	},

	{
		path: "**",
		redirectTo: "",
		pathMatch: "prefix"
	}
]

@NgModule({
	declarations: [
		AuthComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxIconsModule,
		CustomRaisedButtonModule,
		MatRippleModule,
		NgOptimizedImage
	],
	providers: [AuthService]
})
export class AuthModule {
}
