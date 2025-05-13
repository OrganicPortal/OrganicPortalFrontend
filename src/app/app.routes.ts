import {AllowedGroupsOfUsers, RoutesExtended} from "../addons/states/states"
import {MainModule} from "./main/main.module"

export const routes: RoutesExtended = [
	{
		path: "",
		loadChildren: () => MainModule
	},


	{
		path: "qr-info",
		loadChildren: () => import("./main/pages/qr-info/qr-info.module").then(x => x.QrInfoModule)
	},

	{
		path: "auth-overlay",
		outlet: "auth-overlay",
		loadChildren: () => import("./main/pages/auth/auth-overlay/auth-overlay.module").then(x => x.AuthOverlayModule),
		data: {
			canActivateGroups: [
				AllowedGroupsOfUsers.Any
			]
		}
	},

	{
		path: "auth",
		loadChildren: () => import("./main/pages/auth/auth.module").then(m => m.AuthModule),
		data: {
			canActivateGroups: [
				AllowedGroupsOfUsers.Any
			]
		}
	},

	{
		path: "**",
		redirectTo: "",
		pathMatch: "full"
	}
]
