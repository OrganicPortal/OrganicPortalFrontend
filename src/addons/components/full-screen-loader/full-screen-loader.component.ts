import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Component({
	selector: "full-screen-loader",
	standalone: false,
	templateUrl: "./full-screen-loader.component.html",
	styleUrl: "./full-screen-loader.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: []
})
export class FullScreenLoaderComponent extends LifeHooksFactory {
	constructor() {
		super()
	}

	public override ngOnInit() {
		super.ngOnInit()
	}
}
