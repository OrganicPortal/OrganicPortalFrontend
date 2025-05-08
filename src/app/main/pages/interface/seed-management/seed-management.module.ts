import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {DotsLoaderModule} from "../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../addons/components/error-loading/error-loading.module"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SeedManagementComponent} from "./seed-management.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: SeedManagementComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./seed-list/seed-list.module").then(x => x.SeedListModule)
			},

			{
				path: "new",
				loadChildren: () => import("./new-seed/new-seed.module").then(x => x.NewSeedModule)
			},

			{
				path: "edit/:seedId",
				loadChildren: () => import("./edit-seed/edit-seed.module").then(x => x.EditSeedModule)
			}
		]
	}
]

@NgModule({
	declarations: [SeedManagementComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		DotsLoaderModule,
		ErrorLoadingModule
	]
})
export class SeedManagementModule {
}
