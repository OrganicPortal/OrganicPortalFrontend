import {Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {fullScreenLoaderAnimation} from "../../addons/components/dots-loader/animations"

@Component({
	selector: "app-main",
	standalone: false,
	templateUrl: "./main.component.html",
	styleUrl: "./main.component.scss",
	animations: [fullScreenLoaderAnimation]
})
export class MainComponent extends LifeHooksFactory {
	constructor() {
		super()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
	}
}
