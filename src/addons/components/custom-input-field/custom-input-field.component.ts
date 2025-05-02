import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ElementRef,
	Input,
	Renderer2,
	ViewEncapsulation
} from "@angular/core"
import {FormControl, FormGroupDirective, NgControl} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {fromEvent, takeUntil, tap} from "rxjs"
import {CustomInputDirective} from "../../directives/inputs/custom-input/custom-input.directive"

@Component({
	selector: "custom-input-field",
	templateUrl: "./custom-input-field.component.html",
	styleUrl: "./custom-input-field.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated,
	providers: [FormGroupDirective]
})
export class CustomInputFieldComponent extends LifeHooksFactory {
	@ContentChild(CustomInputDirective, {read: ElementRef}) customInput!: ElementRef<HTMLInputElement>
	@ContentChild(CustomInputDirective, {read: NgControl}) customInputControl!: NgControl

	constructor(
		private _renderer2: Renderer2
	) {
		super()
	}

	public _isDisableLabel: boolean = false

	@Input() public set isDisableLabel(value: boolean) {
		this._isDisableLabel = value
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()

		const control = this.customInputControl?.control as FormControl
		const elem = this.customInput.nativeElement
		this._renderer2.addClass(elem, "empty-field")

		if (control?.hasError("required")!)
			this._renderer2.addClass(elem, "field-required")

		fromEvent(elem, "blur")
			.pipe(
				tap(() => {
					this._renderer2.addClass(elem, "has-focused")
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

		if (elem.form)
			fromEvent(elem.form, "submit")
				.pipe(
					tap(() => {
						control?.updateValueAndValidity()
						this._renderer2.addClass(elem, "submitted")
						this._renderer2.addClass(elem, "has-focused")
					}),
					takeUntil(this.componentDestroy$)
				).subscribe()

		control?.statusChanges
			.pipe(
				tap(() => {
					if (!control.value) {
						this._renderer2.addClass(elem, "empty-field")
					} else {
						this._renderer2.removeClass(elem, "empty-field")
					}

					if (control.value) {
						this._renderer2.addClass(elem, "has-focused")
					}

					if (control.hasError("required")) {
						this._renderer2.addClass(elem, "field-required")
					}

					if (control.valid) {
						this._renderer2.addClass(elem, "valid")
						this._renderer2.removeClass(elem, "invalid")
						return
					}

					this._renderer2.addClass(elem, "invalid")
					this._renderer2.removeClass(elem, "valid")
				}),
				takeUntil(this.componentDestroy$)
			)?.subscribe()

		control?.updateValueAndValidity()
	}

	onFocusInput() {
		if (!this.customInput)
			return

		this.customInput.nativeElement.focus()
	}
}
