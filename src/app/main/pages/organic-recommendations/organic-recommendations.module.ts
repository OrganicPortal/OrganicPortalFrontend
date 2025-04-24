import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {OrganicRecommendationsComponent} from "./organic-recommendations.component"

export const routes: Routes = [
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
