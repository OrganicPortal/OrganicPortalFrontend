import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxPipesModule} from "@fixAR496/ngx-elly-lib"
import {
	ClipboardTextContainerModule
} from "../../../../../../addons/components/clipboard-text-container/clipboard-text-container.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../addons/components/error-loading/error-loading.module"
import {RoutesExtended} from "../../../../../../addons/states/states"
import {SharedModule} from "../shared/shared.module"
import {PersonalInfoComponent} from "./personal-info.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: PersonalInfoComponent,
		data: {
			title: "Personal data",
			icon: "text-field-focus"
		}
	}
]

@NgModule({
	declarations: [
		PersonalInfoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,

		FormsModule,
		ReactiveFormsModule,
		NgxGridLayoutModule,
		ClipboardTextContainerModule,

		NgxPipesModule,
		ErrorLoadingModule,
		DotsLoaderModule
	]
})
export class PersonalInfoModule {
}
