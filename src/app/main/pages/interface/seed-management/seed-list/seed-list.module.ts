import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {MatTooltipModule} from "@angular/material/tooltip"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	provideVirtualViewConfig,
	RxVirtualView,
	RxVirtualViewContent,
	RxVirtualViewObserver,
	RxVirtualViewPlaceholder
} from "@rx-angular/template/virtual-view"
import {CustomInputFieldModule} from "../../../../../../addons/components/custom-input-field/custom-input-field.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../addons/components/error-loading/error-loading.module"
import {
	CustomBasicButtonModule
} from "../../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomInputModule} from "../../../../../../addons/directives/inputs/custom-input/custom-input.module"
import {
	CustomBasicLinkModule
} from "../../../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {CustomPipesModule} from "../../../../../../addons/pipes/custom.pipes.module"
import {RoutesExtended} from "../../../../../../addons/states/states"
import {SeedListComponent} from "./seed-list.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: SeedListComponent
	}
]

@NgModule({
	declarations: [SeedListComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxIconsModule,
		NgxGridLayoutModule,
		CustomRaisedButtonModule,
		CustomBasicButtonModule,
		CustomBasicLinkModule,
		CustomInputModule,
		CustomInputFieldModule,
		CustomPipesModule,

		NgxGridLayoutModule,
		MatRippleModule,
		DotsLoaderModule,
		ErrorLoadingModule,

		RxVirtualView,
		RxVirtualViewContent,
		RxVirtualViewObserver,
		RxVirtualViewPlaceholder,
		MatTooltipModule
	],

	providers: [
		provideVirtualViewConfig({
			keepLastKnownSize: true,
			useContentVisibility: false,
			useContainment: true,
			placeholderStrategy: "low",
			contentStrategy: "normal",
			startWithPlaceholderAsap: false,
			cacheEnabled: false,
			cache: {
				contentCacheSize: 20,
				placeholderCacheSize: 20
			}
		})
	]
})
export class SeedListModule {
}
