import {Overlay, ScrollStrategy} from "@angular/cdk/overlay"
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Optional,
	Output,
	Renderer2,
	ViewChild
} from "@angular/core"
import {AbstractControl, FormControl, FormGroupDirective, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, filter, fromEvent, takeUntil, tap} from "rxjs"
import {frameSideInOut4} from "../../animations/shared.animations"
import {CustomDropdownFieldService} from "./custom-dropdown-field.service"

@Component({
	selector: "custom-dropdown-field",
	templateUrl: "./custom-dropdown-field.component.html",
	styleUrl: "./custom-dropdown-field.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: [
		frameSideInOut4
	],
	providers: [
		CustomDropdownFieldService
	]
})
export class CustomDropdownFieldComponent extends LifeHooksFactory {
	@Output() public valueChange$ = new EventEmitter<any>()
	public readonly isOpenedMenu$ = new BehaviorSubject<boolean>(false)
	public scrollStrategy: ScrollStrategy


	@ViewChild("btnMenu") btnMenu!: ElementRef<HTMLElement>

	constructor(
		private _overlay: Overlay,
		private _renderer2: Renderer2,
		private _elem: ElementRef<HTMLElement>,
		@Optional() private _formGroupDirective: FormGroupDirective,
		private _customDropdownFieldService: CustomDropdownFieldService
	) {
		super()

		this.scrollStrategy = this._overlay.scrollStrategies.reposition()
	}

	private _control: AbstractControl<any> | FormControl = new FormControl()

	@Input() public set control(value: AbstractControl<any> | FormControl) {
		this._control = value
	}

	public get selectedOptionRef$() {
		return this._customDropdownFieldService.selectedOptionRef$
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._customDropdownFieldService.initialValue$.next(this._control.value)

		this._customDropdownFieldService
			.selectedOptionRef$
			.pipe(
				filter(el => !!el),
				tap((el) => {
					const newState = el.componentValue ?? el.innerText
					this._control.setValue(newState)

					if (!el.isInitialValue)
						this.valueChange$.next(newState)
				}),
				takeUntil(this.componentDestroy$)
			)
			.subscribe()


		this._control
			?.statusChanges
			.pipe(
				tap((el) => {
					const elem = this._elem.nativeElement

					if (this._control.hasValidator(Validators.required)) {
						this._renderer2.addClass(elem, "field-required")
					}

					if (this._control.value && this._control.dirty) {
						this._renderer2.addClass(elem, "has-focused")
					}

					if (this._control.valid) {
						this._renderer2.addClass(elem, "valid")
						this._renderer2.removeClass(elem, "invalid")
						return
					}

					this._renderer2.addClass(elem, "invalid")
					this._renderer2.removeClass(elem, "valid")

				}),
				takeUntil(this.componentDestroy$))
			.subscribe()

		this._control?.updateValueAndValidity()

		const ngSubmit = this._formGroupDirective?.ngSubmit

		ngSubmit?.pipe(
			tap((el) => {
				this._renderer2.addClass(this._elem.nativeElement, "submitted")
			}),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()

		fromEvent(this.btnMenu.nativeElement, "blur")
			.pipe(
				tap(() => {
					this._renderer2.addClass(this.btnMenu.nativeElement, "has-focused")
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public isDisabledControl() {
		return this._control.disabled
	}

	public onClickToMenu(button: HTMLButtonElement, currState: boolean) {
		if (currState) {
			this._renderer2.removeClass(button, "focused")
			button.blur()
		} else
			this._renderer2.addClass(button, "focused")

		this.isOpenedMenu$.next(!currState)
	}

	public onFocusMenu(button: HTMLButtonElement) {
		this._renderer2.addClass(button, "focused")
	}

	public onFocusOutMenu(button: HTMLButtonElement) {
		this.isOpenedMenu$.next(false)
		this._renderer2.removeClass(button, "focused")
	}

}
