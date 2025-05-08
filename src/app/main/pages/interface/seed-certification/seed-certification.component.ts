import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-seed-certification",
	standalone: false,
	templateUrl: "./seed-certification.component.html",
	styleUrl: "./seed-certification.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeedCertificationComponent {
	constructor() {
	}
}
