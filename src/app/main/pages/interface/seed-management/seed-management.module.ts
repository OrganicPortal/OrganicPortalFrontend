import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SeedManagementComponent} from "./seed-management.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: SeedManagementComponent
	}
]

@NgModule({
	declarations: [SeedManagementComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class SeedManagementModule {
}
