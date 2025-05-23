import {ClipboardModule} from "@angular/cdk/clipboard"
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {MatTooltipModule} from "@angular/material/tooltip"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	ClipboardTextContainerModule
} from "../../../../../addons/components/clipboard-text-container/clipboard-text-container.module"
import {DotsLoaderModule} from "../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../addons/components/error-loading/error-loading.module"
import {NgTitleModule} from "../../../../../addons/components/ng-materials/ng-title/ng-title.module"
import {
	CustomRaisedButtonModule
} from "../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomPipesModule} from "../../../../../addons/pipes/custom.pipes.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SeedManagementService} from "../../interface/seed-management/seed-management.service"
import {ProductInfoModalModule} from "./product-info-modal/product-info-modal.module"
import {ProductInfoComponent} from "./product-info.component"
import {ProductInfoService} from "./product-info.service"

export const routes: RoutesExtended = [
	{
		path: "",
		component: ProductInfoComponent
	}
]

@NgModule({
	declarations: [
		ProductInfoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgTitleModule,
		NgxIconsModule,
		DotsLoaderModule,
		ErrorLoadingModule,
		NgOptimizedImage,
		ClipboardTextContainerModule,
		CustomPipesModule,
		CustomRaisedButtonModule,
		ClipboardModule,
		MatTooltipModule,
		MatRippleModule,
		ProductInfoModalModule
	],

	providers: [
		ProductInfoService,
		SeedManagementService
	]
})
export class ProductInfoModule {
}
