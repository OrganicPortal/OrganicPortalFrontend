import {Directive, ElementRef, Renderer2} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {fromEvent, startWith, takeUntil, tap} from "rxjs"

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

		fromEvent(this._elem.nativeElement, "input")
			.pipe(
				startWith(this._elem.nativeElement.value),
				tap(el => {
					const evt = el as any

					if(typeof(el) == "string"){
						if(!el){
							this._renderer.addClass(this._elem.nativeElement, "empty-field")
							return
						}

						return
					}

					if (!evt?.target?.value) {
						this._renderer.addClass(this._elem.nativeElement, "empty-field")
						return
					}

					this._renderer.removeClass(this._elem.nativeElement, "empty-field")
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this._renderer.addClass(this._elem.nativeElement, "custom-input")
	}

}
