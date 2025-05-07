import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Component({
	selector: "custom-selection-menu",
	templateUrl: "./custom-selection-menu.component.html",
	styleUrl: "./custom-selection-menu.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: []
})
export class CustomSelectionMenuComponent extends LifeHooksFactory {
	public override ngOnInit() {
		super.ngOnInit()
	}
}
