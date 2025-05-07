import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "refresh-button",
	templateUrl: "./refresh-button.component.html",
	styleUrl: "./refresh-button.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefreshButtonComponent {

}
