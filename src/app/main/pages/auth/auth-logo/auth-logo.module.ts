import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {AuthLogoComponent} from "./auth-logo.component"


@NgModule({
	declarations: [AuthLogoComponent],
	exports: [AuthLogoComponent],
	imports: [
		CommonModule,
		NgOptimizedImage
	]
})
export class AuthLogoModule {
}
