import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {filter, takeUntil, tap} from "rxjs"
import {CustomDropdownFieldService, SelectedDropdownItemModel} from "../custom-dropdown-field.service"

@Component({
	selector: "custom-selection-option",
	templateUrl: "./custom-selection-option.component.html",
	styleUrl: "./custom-selection-option.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectionOptionComponent extends LifeHooksFactory {
	@Input() value: any

	@ViewChild("btnEl", ) btnEl!: ElementRef<HTMLButtonElement>
	constructor(
		private _customDropdownFieldService: CustomDropdownFieldService
	) {
		super()
	}

	private _isSelected: boolean = false

	@Input() public set isSelected(value: boolean) {
		this._isSelected = value
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public get selectedOptionRef$(){
		return this._customDropdownFieldService
			.selectedOptionRef$
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()


		if (this._isSelected && this.btnEl) {
			this.selectedOptionRef$
				.next(
					new SelectedDropdownItemModel(this.btnEl.nativeElement.innerText, this.value)
				)

			return
		}

		this._customDropdownFieldService
			.initialValue$
			.pipe(
				filter(el => el != undefined && el === this.value),
				tap((el) => {
					this.selectedOptionRef$
						.next(
							new SelectedDropdownItemModel(this.btnEl.nativeElement.innerText, this.value)
						)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onFocusElement(button: HTMLButtonElement) {
		this._customDropdownFieldService.initialValue$.next(undefined)

		this.selectedOptionRef$
			.next(
				new SelectedDropdownItemModel(button.innerText, this.value)
			)
	}
}
