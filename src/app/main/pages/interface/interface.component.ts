import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-interface",
	standalone: false,
	templateUrl: "./interface.component.html",
	styleUrl: "./interface.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterfaceComponent {
	constructor() {
	}
}
