import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {RoutesExtended} from "../../../../../addons/states/states"
import {SharedModule} from "../shared/shared.module"
import {PersonalCompaniesComponent} from "./personal-companies.component"

export const routes: RoutesExtended = [
	{
		path: "",
		component: PersonalCompaniesComponent,
		data: {
			title: "Мої компанії",
			icon: "flag-2"
		}
	},

	{
		path: "**",
		pathMatch: "full",
		redirectTo: ""
	}
]

@NgModule({
	declarations: [
		PersonalCompaniesComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class PersonalCompaniesModule {
}
