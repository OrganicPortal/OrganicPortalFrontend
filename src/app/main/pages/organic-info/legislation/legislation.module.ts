import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {LegislationComponent} from "./legislation.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: LegislationComponent
	}
]

@NgModule({
	declarations: [
		LegislationComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class LegislationModule {
}
