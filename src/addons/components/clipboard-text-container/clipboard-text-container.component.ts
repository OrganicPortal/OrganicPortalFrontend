import {AfterViewInit, Component, HostBinding, HostListener, Input, OnDestroy} from "@angular/core"
import {Subject} from "rxjs"
import {NgShortMessageService} from "../ng-materials/ng-short-message/ng-short-message.service"

@Component({
	selector: "clipboard-text-container",
	templateUrl: "./clipboard-text-container.component.html",
	styleUrl: "./clipboard-text-container.component.scss",
	standalone: false
})
export class ClipboardTextContainerComponent implements OnDestroy, AfterViewInit {
	@Input() text: string = ""
	@Input() clipboardType?: "default" | "oninput" = "default"
	@Input() isShortAction: boolean = false
	@Input() isEnableBg = false
	@Input() isEnableCopyIcon = false

	isMouseDown: boolean = false
	isMouseOver: boolean = false
	unsubscribe$: Subject<void> = new Subject<void>()

	constructor(
		private _ngShortMessageService: NgShortMessageService
	) {
	}

	@HostBinding("class.clipboard-on-input")
	get hoverState() {
		return this.clipboardType !== "default"
	}

	ngAfterViewInit(): void {
	}

	ngOnDestroy(): void {
		this.unsubscribe$?.next()
		this.unsubscribe$?.complete()
	}

	@HostListener("click")
	onAlertMessage() {
		let shortMsg = "Text successfully copied"
		this._ngShortMessageService.onInitMessage(shortMsg, "check-circle")
	}
}
