import {Directive, ElementRef, Input} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {ClassListFactoryService} from "../../../services/classlist.factory.service"

@Directive({
	selector: "[customRaisedButton], [custom-raised-button]",
	standalone: false
})
export class CustomRaisedButtonDirective extends LifeHooksFactory{
    @Input() public set isRounded(value: boolean) {
        this._classListFactoryService.onAddClasses(this._elem, ["full-rounded"])
    }

	constructor(
        private _elem: ElementRef<HTMLElement>,
        private _classListFactoryService: ClassListFactoryService
    ) {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()

		this._classListFactoryService
			.onAddClasses(this._elem, ["custom-button", "custom-raised-button"])
	}

}
