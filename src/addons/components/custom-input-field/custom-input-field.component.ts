import {ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewEncapsulation} from "@angular/core"
import {CustomInputDirective} from "../../directives/inputs/custom-input/custom-input.directive"

@Component({
	selector: "custom-input-field",
	templateUrl: "./custom-input-field.component.html",
	styleUrl: "./custom-input-field.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated
})
export class CustomInputFieldComponent {
	@ContentChild(CustomInputDirective, {read: ElementRef}) customInput!: ElementRef<HTMLInputElement>

	constructor() {
	}

	onFocusInput(){
		if(!this.customInput)
			return

		this.customInput.nativeElement.focus()
	}
}
