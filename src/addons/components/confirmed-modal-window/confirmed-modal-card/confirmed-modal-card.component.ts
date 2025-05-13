import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	OnInit, TemplateRef,
	ViewChild
} from "@angular/core"
import {ConfirmedModalWindowService, IConfirmedModalWindow} from "../confirmed-modal-window.service"

@Component({
	selector: "confirmed-modal-card",
	templateUrl: "./confirmed-modal-card.component.html",
	styleUrl: "./confirmed-modal-card.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class ConfirmedModalCardComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() card!: IConfirmedModalWindow

	@ViewChild("buttonEl") buttonEl!: ElementRef<HTMLButtonElement>

	constructor(
		private _confirmedModalWindowService: ConfirmedModalWindowService
	) {
	}

	public get isTemplateMessage() {
		return typeof this.card.message !== "string"
	}

	public get templateMessage(){
		return this.card.message as TemplateRef<any>
	}

	public get templateContext(){
		return this.card.templateRefContext ?? {}
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.buttonEl?.nativeElement?.focus()

	}

	ngOnDestroy(): void {

	}

	@HostListener("document:keydown.escape", ["$event"])
	onCloseWindow() {
		if (this.card.id != undefined) {
			this.card.onHandlerWindowEvent$.next({isConfirmWindow: false})
			this._confirmedModalWindowService.onDestroyMessageById(this.card.id)
		}
	}

	onConfirmWindow() {
		this.card.onHandlerWindowEvent$.next({isConfirmWindow: true})
		this._confirmedModalWindowService.onDestroyMessageById(this.card.id)
	}
}
