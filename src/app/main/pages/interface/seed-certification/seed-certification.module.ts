import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SeedCertificationComponent} from "./seed-certification.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: SeedCertificationComponent
	}
]

@NgModule({
	declarations: [
		SeedCertificationComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class SeedCertificationModule {
}
