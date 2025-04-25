import {Directive, ElementRef, Input} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {ClassListFactoryService} from "../../../services/classlist.factory.service"

@Directive({
	selector: "[custom-basic-link], [customBasicLink]",
	standalone: false
})
export class CustomBasicLinkDirective extends LifeHooksFactory {
	constructor(
		private _elem: ElementRef<HTMLElement>,
		private _classListFactoryService: ClassListFactoryService
	) {
		super()
	}

	@Input() public set style(_style: "default" | "default-reverse") {
		let toggleClass = ["custom-basic-link-default-style"]

		if (_style === "default-reverse")
			toggleClass = ["custom-basic-link-default-reverse-style"]

		this._classListFactoryService
			.onAddClasses(this._elem, toggleClass)

	}

	override ngOnInit() {
		super.ngOnInit()

		this._classListFactoryService
			.onAddClasses(this._elem, ["custom-basic-link", "custom-basic-link-default-style"])
	}

}
