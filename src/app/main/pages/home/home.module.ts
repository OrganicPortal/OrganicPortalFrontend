import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule, Routes} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomBasicButtonModule} from "../../../../addons/directives/buttons/./custom-basic-button/custom-button.module"
import {HomeComponent} from "./home.component"

export const routes: Routes = [
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
