import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Component({
	selector: "app-main",
	standalone: false,
	templateUrl: "./main.component.html",
	styleUrl: "./main.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: []
})
export class MainComponent extends LifeHooksFactory {
	constructor() {
		super()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
	}
}
