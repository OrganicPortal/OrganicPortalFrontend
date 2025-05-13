import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {MatTooltipModule} from "@angular/material/tooltip"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {DotsLoaderModule} from "../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../addons/components/error-loading/error-loading.module"
import {NgLayoutsModule} from "../../../../addons/components/ng-materials/ng-layouts/ng-layouts.module"
import {NgTitleModule} from "../../../../addons/components/ng-materials/ng-title/ng-title.module"
import {CustomBasicButtonModule} from "../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomBasicLinkModule} from "../../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {CustomPipesModule} from "../../../../addons/pipes/custom.pipes.module"
import {RoutesExtended} from "../../../../addons/states/states"
import {CertificatedProductsService} from "../certificated-products/certificated-products.service"
import {SeedManagementService} from "../interface/seed-management/seed-management.service"
import {QrInfoComponent} from "./qr-info.component"
import {QrInfoService} from "./qr-info.service"

export const routes: RoutesExtended = [
	{
		path: "",
		component: QrInfoComponent
	}
]

@NgModule({
	declarations: [QrInfoComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		NgxIconsModule,
		MatRippleModule,
		CustomBasicLinkModule,
		CustomBasicButtonModule,
		CustomRaisedButtonModule,
		NgTitleModule,
		DotsLoaderModule,
		ErrorLoadingModule,
		CustomPipesModule,
		MatTooltipModule,
		NgLayoutsModule,
		NgOptimizedImage
	],
	providers: [
		QrInfoService,
		CertificatedProductsService,
		SeedManagementService
	]
})
export class QrInfoModule {
}
