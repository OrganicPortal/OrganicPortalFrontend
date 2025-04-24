import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-main",
	standalone: false,
	templateUrl: "./main.component.html",
	styleUrl: "./main.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
	constructor() {
	}
}
