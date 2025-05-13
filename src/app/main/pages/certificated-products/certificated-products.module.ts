import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../addons/states/states"
import {SeedManagementService} from "../interface/seed-management/seed-management.service"
import {CertificatedProductsComponent} from "./certificated-products.component"
import {CertificatedProductsService} from "./certificated-products.service"
import {ProductsListService} from "./products-list/products-list.service"

export const routes: RoutesExtended = [
	{
		path: "",
		component: CertificatedProductsComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./products-list/products-list.module").then(x => x.ProductsListModule)
			},

			{
				path: ":productAccessKey/:productHistoryKey",
				loadChildren: () => import("./product-info/product-info.module").then(x => x.ProductInfoModule)
			},
		]
	}
]

@NgModule({
	declarations: [
		CertificatedProductsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],

	providers: [
		CertificatedProductsService,
		ProductsListService,
		SeedManagementService
	]
})
export class CertificatedProductsModule {
}
