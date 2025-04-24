import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Component({
	selector: "app-body",
	standalone: false,
	templateUrl: "./body.component.html",
	styleUrl: "./body.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent extends LifeHooksFactory {
	constructor() {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()
	}
}
