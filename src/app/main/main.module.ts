import {ScrollingModule} from "@angular/cdk/scrolling"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {
	RxVirtualView,
	RxVirtualViewContent,
	RxVirtualViewObserver,
	RxVirtualViewPlaceholder
} from "@rx-angular/template/virtual-view"
import {FullScreenLoaderModule} from "../../addons/components/full-screen-loader/full-screen-loader.module"
import {UserGroupsGuardService} from "../../addons/guards/user-groups.guard.service"
import {AllowedGroupsOfUsers, RoutesExtended} from "../../addons/states/states"
import {MainComponent} from "./main.component"
import {WrapperModule} from "./wrapper/wrapper.module"

export const routes: RoutesExtended = [
	{
		path: "",
		component: MainComponent,

		children: [
			{
				path: "",
				loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.Any
					]
				}
			},

			{
				path: "legislation",
				loadChildren: () => import("./pages/legislation/legislation.module").then(m => m.LegislationModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.Any
					]
				}
			},

			{
				path: "history-of-development",
				loadChildren: () => import("./pages/history-of-development/history-of-development.module").then(m => m.HistoryOfDevelopmentModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.Any
					]
				}
			},

			{
				path: "organic-map",
				loadChildren: () => import("./pages/organic-map/organic-map.module").then(m => m.OrganicMapModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.Any
					]
				}
			},

			{
				path: "organic-recommendations",
				loadChildren: () => import("./pages/organic-recommendations/organic-recommendations.module").then(m => m.OrganicRecommendationsModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.Any
					]
				}
			},

			{
				path: "interface",
				loadChildren: () => import("./pages/interface/interface.module").then(m => m.InterfaceModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyAuthorized
					]
				}
			},

			{
				path: "my-profile",
				loadChildren: () => import("./pages/my-profile/my-profile.module").then(m => m.MyProfileModule),
				canActivate: [UserGroupsGuardService],
				data: {
					canActivateGroups: [
						AllowedGroupsOfUsers.OnlyAuthorized
					]
				}
			}
		]
	}
]

@NgModule({
	declarations: [
		MainComponent
	],
	imports: [
		CommonModule,
		WrapperModule,
		RouterModule.forChild(routes),

		RxVirtualView,
		RxVirtualViewContent,
		RxVirtualViewObserver,
		RxVirtualViewPlaceholder,
		FullScreenLoaderModule,

		ScrollingModule
	],

	providers: []
})
export class MainModule {
}
