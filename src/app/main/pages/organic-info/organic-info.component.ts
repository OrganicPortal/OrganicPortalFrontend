import {ChangeDetectionStrategy, Component} from "@angular/core"
import {textFramesSideIn} from "../../../../addons/animations/shared.animations"

@Component({
	selector: "app-organic-info",
	standalone: false,
	templateUrl: "./organic-info.component.html",
	styleUrl: "./organic-info.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		textFramesSideIn
	]
})
export class OrganicInfoComponent {

}
