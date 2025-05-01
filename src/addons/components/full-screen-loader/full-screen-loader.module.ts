import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {DotsLoaderModule} from "../dots-loader/dots-loader.module"
import {FullScreenLoaderComponent} from "./full-screen-loader.component"


@NgModule({
	declarations: [FullScreenLoaderComponent],
	exports: [FullScreenLoaderComponent],
	imports: [
		CommonModule,
		DotsLoaderModule
	]
})
export class FullScreenLoaderModule {
}
