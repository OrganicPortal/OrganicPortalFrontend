import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {CustomBasicButtonDirective} from "./custom-button.directive"


@NgModule({
	declarations: [CustomBasicButtonDirective],
	exports: [CustomBasicButtonDirective],
	imports: [
		CommonModule
	]
})
export class CustomBasicButtonModule {
}
