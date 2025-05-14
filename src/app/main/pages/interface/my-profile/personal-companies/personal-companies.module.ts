import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {
	CustomBasicButtonModule
} from "../../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomInputModule} from "../../../../../../addons/directives/inputs/custom-input/custom-input.module"
import {
	CustomBasicLinkModule
} from "../../../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {UserGroupsGuardService} from "../../../../../../addons/guards/user-groups.guard.service"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../../../../../addons/states/states"
import {SharedModule} from "../shared/shared.module"
import {PersonalCompaniesComponent} from "./personal-companies.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: PersonalCompaniesComponent,
		data: {
			title: "My companies",
			icon: "flag-2"
		},

		children: [
			{
				path: "",
				loadChildren: () => import("./companies-list/companies-list.module").then((m) => m.CompaniesListModule),
				canActivate: [UserGroupsGuardService],

				data: {
					canActivateGroups: [AllowedGroupsOfUsers.OnlyAuthorized],
					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyAuthorized]: {
							redirectTo: ["/interface"]
						}
					}
				}
			},

			{
				path: "edit/:companyId",
				loadChildren: () => import("./edit-company/edit-company.module").then((m) => m.EditCompanyModule),
				canActivate: [UserGroupsGuardService],

				data: {
					canActivateGroups: [AllowedGroupsOfUsers.OnlyAuthorized],
					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyAuthorized]: {
							redirectTo: ["/interface"]
						}
					}
				}
			},

			{
				path: "new",
				loadChildren: () => import("./create-company/create-company.module").then((m) => m.CreateCompanyModule),
				canActivate: [UserGroupsGuardService],

				data: {
					canActivateGroups: [AllowedGroupsOfUsers.OnlyAuthorized],
					canActivateGroupsRedirectsIfValidationError: {
						[AllowedGroupsOfUsers.OnlyAuthorized]: {
							redirectTo: ["/interface"]
						}
					}
				}
			}
		]
	},

	{
		path: "**",
		pathMatch: "full",
		redirectTo: ""
	}
]

@NgModule({
	declarations: [
		PersonalCompaniesComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,

		CustomInputModule,
		CustomRaisedButtonModule,
		CustomBasicLinkModule,
		CustomBasicButtonModule,
		CustomInputFieldModule,

		MatRippleModule
	]
})
export class PersonalCompaniesModule {
}
