import {ChangeDetectionStrategy, Component, Input} from "@angular/core"

@Component({
	selector: "error-loading-page",
	templateUrl: "./error-loading.component.html",
	styleUrl: "./error-loading.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorLoadingComponent {
	@Input() message: string | undefined
	constructor() {
	}
}
