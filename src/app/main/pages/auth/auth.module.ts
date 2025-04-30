import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule, Routes} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
	CustomRaisedButtonModule
} from "../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {AuthComponent} from "./auth.component"

export const routes: Routes = [
	{
		path: "",
		component: AuthComponent,
		children: [
			{
				path: "login",
				loadChildren: () => import("./login/login.module").then(x => x.LoginModule)
			},

			{
				path: "registration",
				loadChildren: () => import("./registration/registration.module").then((m) => m.RegistrationModule),
			},

			{
				path: "code-confirmation",
				loadChildren: () => import("./code-confirmation/code-confirmation.module").then(x => x.CodeConfirmationModule),
				data: {
					allowToGoBack: true
				}
			},

			{
				path: "**",
				redirectTo: "login",
				pathMatch: "full"
			}
		]
	},

	{
		path: "**",
		redirectTo: "",
		pathMatch: "prefix"
	}
]

@NgModule({
	declarations: [
		AuthComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxIconsModule,
		CustomRaisedButtonModule,
		MatRippleModule,
		NgOptimizedImage
	]
})
export class AuthModule {
}
