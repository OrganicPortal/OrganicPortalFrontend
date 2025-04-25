import {Directive, ElementRef} from "@angular/core"
import {MatRipple} from "@angular/material/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {ClassListFactoryService} from "../../../services/classlist.factory.service"

@Directive({
	selector: "[custom-basic-button], [customBasicButton]",
	standalone: false,
	providers: [MatRipple]
})
export class CustomBasicButtonDirective extends LifeHooksFactory {

	constructor(
		private _elem: ElementRef<HTMLElement>,
		private _classListFactoryService: ClassListFactoryService
	) {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()

		this._classListFactoryService
			.onAddClasses(this._elem, ["custom-button", "custom-basic-button"])
	}
}
