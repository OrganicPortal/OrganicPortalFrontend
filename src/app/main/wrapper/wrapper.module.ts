import {CdkMenuModule, CdkMenuTrigger} from "@angular/cdk/menu"
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {NgModule} from "@angular/core"
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule, NgxToastrModule} from "@fixAR496/ngx-elly-lib"
import {ViewportOverlayModule} from "../../../addons/components/viewport-overlay/viewport-overlay.module"
import {CustomBasicButtonModule} from "../../../addons/directives/buttons/custom-basic-button/custom-button.module"
import {
	CustomRaisedButtonModule
} from "../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomBasicLinkModule} from "../../../addons/directives/links/custom-basic-link/custom-basic-link.module"
import {BodyComponent} from "./body/body.component"
import {FooterComponent} from "./footer/footer.component"
import {HeaderComponent} from "./header/header.component"
import {NavbarComponent} from "./navbar/navbar.component"
import {LoginButtonComponent} from "./shared/login-button/login-button.component"
import {WrapperComponent} from "./wrapper.component"

@NgModule({
	declarations: [
		WrapperComponent,
		HeaderComponent,
		BodyComponent,
		FooterComponent,
		NavbarComponent,
		LoginButtonComponent
	],

	exports: [
		WrapperComponent
	],

	imports: [
		CommonModule,
		NgxIconsModule.forChild(),
		CdkMenuModule,
		RouterModule,
		CdkMenuTrigger,
		NgOptimizedImage,
		CustomBasicButtonModule,
		CustomRaisedButtonModule,
		CustomBasicLinkModule,
		MatRippleModule,
		NgxToastrModule,
		ViewportOverlayModule
	]
})
export class WrapperModule {
}
