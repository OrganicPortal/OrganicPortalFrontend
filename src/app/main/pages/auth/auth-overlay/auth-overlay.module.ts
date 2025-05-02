import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {LoginModule} from "../login/login.module"
import {AuthOverlayComponent} from "./auth-overlay.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: AuthOverlayComponent,
		children: [
			{
				path: "",
				loadChildren: () => LoginModule
			}
		]
	}
]

@NgModule({
	declarations: [AuthOverlayComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class AuthOverlayModule {
}
