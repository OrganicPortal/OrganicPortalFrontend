import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-footer",
	standalone: false,
	templateUrl: "./footer.component.html",
	styleUrl: "./footer.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	constructor() {
	}
}
