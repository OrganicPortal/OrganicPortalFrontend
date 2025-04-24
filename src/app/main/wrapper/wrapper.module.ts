import {CdkMenuModule, CdkMenuTrigger} from "@angular/cdk/menu"
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {BodyComponent} from "./body/body.component"
import {FooterComponent} from "./footer/footer.component"
import {HeaderComponent} from "./header/header.component"
import {WrapperComponent} from "./wrapper.component"

@NgModule({
	declarations: [
		WrapperComponent,
		HeaderComponent,
		BodyComponent,
		FooterComponent
	],

	exports: [
		WrapperComponent
	],

	imports: [
		CommonModule,
		NgxIconsModule.forChild(["test"]),
		CdkMenuModule,
		RouterModule,

		CdkMenuTrigger,

		NgOptimizedImage
	]
})
export class WrapperModule {
}
