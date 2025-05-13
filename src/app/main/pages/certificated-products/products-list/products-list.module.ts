import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatTooltipModule} from "@angular/material/tooltip"
import {RouterModule} from "@angular/router"
import {NgxGridLayoutModule, NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	RxVirtualView,
	RxVirtualViewContent,
	RxVirtualViewObserver,
	RxVirtualViewPlaceholder
} from "@rx-angular/template/virtual-view"
import {DotsLoaderModule} from "../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../addons/components/error-loading/error-loading.module"
import {NgTitleModule} from "../../../../../addons/components/ng-materials/ng-title/ng-title.module"
import {
	CustomBasicButtonModule
} from "../../../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomPipesModule} from "../../../../../addons/pipes/custom.pipes.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {ProductInfoModalModule} from "../product-info/product-info-modal/product-info-modal.module"
import {ProductsListComponent} from "./products-list.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: ProductsListComponent
	}
]

@NgModule({
	declarations: [
		ProductsListComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatPaginatorModule,
		DotsLoaderModule,
		ErrorLoadingModule,
		CustomBasicButtonModule,
		CustomPipesModule,
		CustomRaisedButtonModule,
		MatRippleModule,
		NgxGridLayoutModule,
		NgxIconsModule,
		RxVirtualViewObserver,

		RxVirtualView,
		RxVirtualViewContent,
		RxVirtualViewPlaceholder,
		MatTooltipModule,
		NgTitleModule,
		ProductInfoModalModule
	]
})
export class ProductsListModule {
}
