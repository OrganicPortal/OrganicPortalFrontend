import {Routes} from "@angular/router"
import {MainComponent} from "./main/main.component"
import {MainModule} from "./main/main.module"

export const routes: Routes = [
	{
		path: "",
		loadChildren: () => MainModule
	}
]
