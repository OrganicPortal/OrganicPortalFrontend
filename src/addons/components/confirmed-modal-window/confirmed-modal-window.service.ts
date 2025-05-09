import {Injectable, OnDestroy, TemplateRef} from "@angular/core"
import {Observable, Subject, takeUntil} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class ConfirmedModalWindowService implements OnDestroy {
	modalWindowList: Array<IConfirmedModalWindow> = []
	modalWindowCoutner: number = 0

	public readonly onDetectModals$: Subject<void> = new Subject<void>()
	public readonly onInitModalsComponent$: Subject<void> = new Subject<void>()
	private readonly unsubscribe$: Subject<void> = new Subject<void>()

	constructor() {
		this.onInitModalsComponent$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(res => {
				this.onDetectModals$.next()
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$?.next()
		this.unsubscribe$?.complete()
	}

	onCreateModalWindow(message: string | TemplateRef<any>, type?: "confirm" | "info", confirmedBtnFn?: Function, isCloseBtn?: boolean): Observable<{
		isConfirmWindow: boolean
	}> {
		let modalWindow: IConfirmedModalWindow = {
			id: this.modalWindowCoutner,
			type: type ? type : "confirm",
			message: message,

			isCloseBtn: isCloseBtn != undefined ? isCloseBtn : true,
			confirmedBtnFn: confirmedBtnFn,

			onHandlerWindowEvent$: new Subject<{ isConfirmWindow: boolean }>()
		}

		if (this.modalWindowList.length == 0)
			this.modalWindowCoutner = 0

		this.modalWindowCoutner++
		this.modalWindowList.push(modalWindow)
		this.onDetectModals$.next()

		return modalWindow.onHandlerWindowEvent$
	}

	onDestroyMessageById(cardId: number) {
		this.modalWindowList = this.modalWindowList.filter(el => {
			if (el.id == cardId)
				el.onHandlerWindowEvent$.complete()

			return el.id != cardId
		})

		this.onDetectModals$.next()
	}
}

export interface IConfirmedModalWindow {
	id: number
	type: "confirm" | "info"
	message: string | TemplateRef<any>

	isCloseBtn: boolean
	confirmedBtnFn?: Function

	onHandlerWindowEvent$: Subject<{ isConfirmWindow: boolean }>
}
