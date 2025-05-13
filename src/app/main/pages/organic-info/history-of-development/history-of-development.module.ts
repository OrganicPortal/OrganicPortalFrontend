import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {HistoryOfDevelopmentComponent} from "./history-of-development.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: HistoryOfDevelopmentComponent
	}
]

@NgModule({
	declarations: [
		HistoryOfDevelopmentComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class HistoryOfDevelopmentModule {
}
