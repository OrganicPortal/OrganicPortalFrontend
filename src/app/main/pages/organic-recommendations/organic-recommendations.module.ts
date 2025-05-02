import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../addons/states/states"
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
		RouterModule.forChild(routes)
	]
})
export class OrganicRecommendationsModule {
}
