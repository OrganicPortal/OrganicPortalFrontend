import {Routes} from "@angular/router"
import {MainModule} from "./main/main.module"

export const routes: Routes = [
	{
		path: "",
		loadChildren: () => MainModule
	},

	{
		path: "auth-overlay",
		outlet: "auth-overlay",
		loadChildren: () => import("./main/pages/auth/auth-overlay/auth-overlay.module").then(x => x.AuthOverlayModule)
	},

	{
		path: "auth",
		loadChildren: () => import("./main/pages/auth/auth.module").then(m => m.AuthModule)
	}
]
