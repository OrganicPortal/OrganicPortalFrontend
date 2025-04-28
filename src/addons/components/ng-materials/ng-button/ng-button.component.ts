import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core"

@Component({
	selector: "ng-button",
	templateUrl: "./ng-button.component.html",
	styleUrl: "./ng-button.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class NgButtonComponent implements AfterViewInit {
	@Input() type: "button" | "submit" = "button"
	@Input() title: string = ""

	@HostBinding("class.disabled")
	@Input() isDisabled: boolean = false

	constructor() {
	}

	ngAfterViewInit(): void {
	}
}
