import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomBasicButtonModule} from "../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomBasicLinkModule} from "../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {RoutesExtended} from "../../../../addons/states/states"
import {OrganicInfoComponent} from "./organic-info.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: OrganicInfoComponent,

		children: [
			{
				path: "recommendations",
				loadChildren: () => import("./organic-recommendations/organic-recommendations.module").then(x => x.OrganicRecommendationsModule)
			},

			{
				path: "history-of-development",
				loadChildren: () => import("./history-of-development/history-of-development.module").then(x => x.HistoryOfDevelopmentModule)
			},

			{
				path: "legislation",
				loadChildren: () => import("./legislation/legislation.module").then(x => x.LegislationModule)
			},

			{
				path: "**",
				redirectTo: "recommendations",
				pathMatch: "full"
			}
		]
	}
]

@NgModule({
	declarations: [
		OrganicInfoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CustomBasicLinkModule,
		CustomRaisedButtonModule,
		CustomBasicButtonModule,
		NgxIconsModule
	]
})
export class OrganicInfoModule {
}
