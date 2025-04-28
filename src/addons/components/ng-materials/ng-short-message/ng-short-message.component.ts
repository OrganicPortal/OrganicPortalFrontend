import {animate, group, sequence, style, transition, trigger} from "@angular/animations"
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	Renderer2
} from "@angular/core"
import {NgShortMessageService, ShortMessageModel} from "./ng-short-message.service"

@Component({
	selector: "ng-short-messages",
	templateUrl: "./ng-short-message.component.html",
	styleUrl: "./ng-short-message.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("shortMessage", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(20px)"
				}),
				sequence([
					animate(".4s ease", style("*"))
				])
			]),
			transition(":leave", [
				style({
					transform: "*"
				}),
				group([
					animate(".4s ease", style({
						"transform": "translateX(calc({{value}}))",
						opacity: 0
					}))
				])
			], {params: {value: "100px"}})
		])
	],
	standalone: false
})
export class NgShortMessageComponent implements AfterViewInit {
	public triggerPosition: "top-left" | "top-right" | "bottom-right" | "bottom-left" = "bottom-right"
	public isReflectToLeft: boolean = this.triggerPosition == "top-left" || this.triggerPosition == "bottom-left"
	public maxViewMessages: number

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _renderer2: Renderer2,
		private _elem: ElementRef<HTMLElement>,
		private _cdr: ChangeDetectorRef
	) {
		this.maxViewMessages = this._ngShortMessageService.maxViewMessages
	}

	@Input() public set position(value: "top-left" | "top-right" | "bottom-right" | "bottom-left") {
		value = value ? value : "bottom-right"
		this.triggerPosition = value
		this.isReflectToLeft = this.triggerPosition == "top-left" || this.triggerPosition == "bottom-left"
	}

	public get activeMessages$() {
		return this._ngShortMessageService.activeMessages$
	}

	ngAfterViewInit(): void {
		this._renderer2.setStyle(this._elem.nativeElement, "--max-items", this.maxViewMessages, 2)
		this._ngShortMessageService.maxViewMessages = this.maxViewMessages
		this.onSetComponentPosition()
	}

	onDoneAnimation(message: ShortMessageModel) {
		message.isDoneParentAnimation = true
	}

	private onSetComponentPosition() {
		if (!this._elem || !this._renderer2)
			return

		let elem = this._elem.nativeElement
		this._renderer2.addClass(elem, this.triggerPosition)
	}
}
