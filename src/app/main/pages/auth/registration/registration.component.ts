import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"

@Component({
	selector: "app-registration",
	standalone: false,
	templateUrl: "./registration.component.html",
	styleUrls: [
		"./registration.component.scss",
		"../shared/shared.styles.scss"
	],
	animations: [
		frameSideIn4
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent extends LifeHooksFactory{
	constructor() {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()
	}

	public onSubmit(){

	}
}
