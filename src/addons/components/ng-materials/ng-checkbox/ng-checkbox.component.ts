import {ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit} from "@angular/core"
import {FormControl} from "@angular/forms"
import {Subject} from "rxjs"

@Component({
	selector: "ng-checkbox",
	templateUrl: "./ng-checkbox.component.html",
	styleUrl: "./ng-checkbox.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class NgCheckboxComponent implements OnInit, OnDestroy {
	@Input() control: FormControl = new FormControl()
	@Input() isAutoChangeValue: boolean = true
	@Input() isDisabled?: boolean = false
	/**
	 * style-1 – Switcher
	 * style-2 – austere (checkbox) style
	 * style-3 – rounded (radio) style
	 */
	@Input() viewStyle?: "style-1" | "style-2" | "style-3" = "style-2"
	@Input() viewFrameType?: "relative-parent" | "fixed" = "fixed"
	private readonly unsubscribe$: Subject<void> = new Subject<void>()

	constructor() {

	}

	@HostBinding("class.relative-parent")
	public get state() {
		return this.viewFrameType === "relative-parent"
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.unsubscribe$?.next()
		this.unsubscribe$?.complete()
	}

	onChangeValue() {
		if (this.isDisabled || this.control.disabled || !this.isAutoChangeValue)
			return

		let currValue = this.control.value
		this.control.setValue(!currValue)
	}
}
