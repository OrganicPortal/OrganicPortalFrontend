import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {
	RxVirtualView,
	RxVirtualViewContent,
	RxVirtualViewObserver,
	RxVirtualViewPlaceholder
} from "@rx-angular/template/virtual-view"
import {MainComponent} from "./main.component"
import {AuthComponent} from "./pages/auth/auth.component"
import {WrapperModule} from "./wrapper/wrapper.module"

export const routes: Routes = [
	{
		path: "",
		component: MainComponent,

		children: [
			{
				path: "",
				loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
			},

			{
				path: "legislation",
				loadChildren: () => import("./pages/legislation/legislation.module").then(m => m.LegislationModule)
			},

			{
				path: "history-of-development",
				loadChildren: () => import("./pages/history-of-development/history-of-development.module").then(m => m.HistoryOfDevelopmentModule)
			},

			{
				path: "organic-map",
				loadChildren: () => import("./pages/organic-map/organic-map.module").then(m => m.OrganicMapModule)
			},

			{
				path: "organic-recommendations",
				loadChildren: () => import("./pages/organic-recommendations/organic-recommendations.module").then(m => m.OrganicRecommendationsModule)
			},
		]
	},



	// {
	// 	path: "**",
	// 	redirectTo: "",
	// 	pathMatch: "full"
	// }
]

@NgModule({
	declarations: [
		MainComponent
	],
	imports: [
		CommonModule,
		WrapperModule,
		RouterModule.forChild(routes),

		RxVirtualView,
		RxVirtualViewContent,
		RxVirtualViewObserver,
		RxVirtualViewPlaceholder
	]
})
export class MainModule {
}
