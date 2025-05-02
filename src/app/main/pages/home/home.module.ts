import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomBasicButtonModule} from "../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {RoutesExtended} from "../../../../addons/states/states"
import {HomeComponent} from "./home.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: HomeComponent
	}
]

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		MatRippleModule,
		NgOptimizedImage,
		NgxIconsModule,
		CustomBasicButtonModule
	]
})
export class HomeModule {
}
