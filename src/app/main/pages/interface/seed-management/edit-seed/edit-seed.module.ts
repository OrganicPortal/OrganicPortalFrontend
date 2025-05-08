import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../../addons/states/states"
import {EditSeedComponent} from "./edit-seed.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: EditSeedComponent
	}
]

@NgModule({
	declarations: [
		EditSeedComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class EditSeedModule {
}
