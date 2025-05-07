import {Directive, ElementRef, Renderer2} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Directive({
	selector: "[customInput]",
	standalone: false
})
export class CustomInputDirective extends LifeHooksFactory {

	constructor(
		private _elem: ElementRef<HTMLInputElement>,
		private _renderer: Renderer2
	) {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()


		// if(this._elem.nativeElement.type === "textarea"){
		// 	this._renderer.addClass(this._elem.nativeElement, "custom-textarea")
		// 	return
		// }

		this._renderer.addClass(this._elem.nativeElement, "custom-input")
	}

}
