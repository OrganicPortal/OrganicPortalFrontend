import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {AuthLogoModule} from "../../auth/auth-logo/auth-logo.module"
import {DashboardComponent} from "./dashboard.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: DashboardComponent
	}
]

@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		AuthLogoModule,
		RouterModule.forChild(routes)
	]
})
export class DashboardModule {
}
