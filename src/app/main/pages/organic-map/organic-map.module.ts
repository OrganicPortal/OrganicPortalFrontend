import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {DotsLoaderModule} from "../../../../addons/components/dots-loader/dots-loader.module"
import {RoutesExtended} from "../../../../addons/states/states"
import {OrganicMapComponent} from "./organic-map.component"


export const routes: RoutesExtended = [
	{
		path: "",
		component: OrganicMapComponent
	}
]

@NgModule({
	declarations: [
		OrganicMapComponent
	],
	imports: [
		CommonModule,
		DotsLoaderModule,
		RouterModule.forChild(routes)
	]
})
export class OrganicMapModule {
}
