import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomBasicButtonModule} from "../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomBasicLinkModule} from "../../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {OrganicRecommendationsComponent} from "./organic-recommendations.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: OrganicRecommendationsComponent
	}
]

@NgModule({
	declarations: [
		OrganicRecommendationsComponent
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
export class OrganicRecommendationsModule {
}
