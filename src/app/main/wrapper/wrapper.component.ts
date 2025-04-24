import {ChangeDetectionStrategy, Component, ElementRef} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {WrapperService} from "./wrapper.service"

@Component({
	selector: "app-wrapper",
	standalone: false,
	templateUrl: "./wrapper.component.html",
	styleUrl: "./wrapper.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent extends LifeHooksFactory {
	constructor(
		private _wrapperService: WrapperService,
		private _elem: ElementRef<HTMLElement>
	) {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()
		this._wrapperService._wrapperScrollFrame = this._elem.nativeElement
	}
}
