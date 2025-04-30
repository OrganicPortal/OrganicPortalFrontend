import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {InterfaceComponent} from "./interface.component"

export const routes: Routes = [
	{
		path: "",
		component: InterfaceComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
			},

			{
				path: "**",
				redirectTo: "",
				pathMatch: "full"
			}
		]
	},

	{
		path: "**",
		redirectTo: "",
		pathMatch: "full"
	}
]

@NgModule({
	declarations: [InterfaceComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class InterfaceModule {
}
