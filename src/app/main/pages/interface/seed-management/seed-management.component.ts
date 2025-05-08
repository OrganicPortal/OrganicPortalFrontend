import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-seed-management",
	standalone: false,
	templateUrl: "./seed-management.component.html",
	styleUrl: "./seed-management.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeedManagementComponent {
	constructor() {
	}
}
