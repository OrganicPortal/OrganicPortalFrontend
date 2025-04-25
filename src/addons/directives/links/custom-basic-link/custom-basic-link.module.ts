import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {CustomBasicLinkDirective} from "./custom-basic-link.directive"


@NgModule({
	declarations: [CustomBasicLinkDirective],
	exports: [CustomBasicLinkDirective],
	imports: [
		CommonModule
	]
})
export class CustomBasicLinkModule {
}
