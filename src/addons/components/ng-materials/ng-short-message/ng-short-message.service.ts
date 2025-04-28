import {Injectable} from "@angular/core"
import {BehaviorSubject, Observable, Subject} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class NgShortMessageService {
	public readonly activeMessages$: BehaviorSubject<Array<ShortMessageModel>> = new BehaviorSubject<Array<ShortMessageModel>>([])
	public maxViewMessages: number = 1

	private messageCounter: number = 0

	constructor() {
	}

	public onDestroyMessage(shortMessage: ShortMessageModel) {
		let state = this.activeMessages$.getValue()

		state = state.filter(el => el !== shortMessage)

		if (state.length === 0)
			this.messageCounter = 0

		this.activeMessages$.next(state)
	}

	public onDestroyMessageById(shortMessageId: number) {
		let state = this.activeMessages$.getValue()

		state = state.filter(el => el.messageId !== shortMessageId)

		if (state.length === 0)
			this.messageCounter = 0

		this.activeMessages$.next(state)
	}

	/**
	 * Create new message
	 */
	public onInitMessage
	(message: string,
	 icon?: string,
	 delay?: number,
	 destroySubject$?: Observable<any | void>
	) {
		let shortMessage = new ShortMessageModel(this.messageCounter, message, new Subject<any | void>(), icon, delay, destroySubject$)
		let state = this.activeMessages$.getValue()

		if (state.length > this.maxViewMessages - 1) {
			state = state.filter((el, idx) => idx !== 0)
		}

		this.activeMessages$.next([...state, shortMessage])

		let messageId = this.messageCounter
		this.messageCounter++

		return messageId
	}
}

export class ShortMessageModel {
	messageId: number

	message: string
	delay: number = 5000
	closeSubject: Subject<void>
	isDoneParentAnimation: boolean = false
	isPauseOfMouseEnter: boolean = false

	destroyer$?: Observable<any | void>
	icon?: string

	constructor(
		messageId: number,
		message: string,
		closeSubject: Subject<void>,
		icon?: string,
		delay?: number,
		destroyer$?: Observable<any | void>
	) {
		this.messageId = messageId
		this.message = message
		this.closeSubject = closeSubject
		this.icon = icon

		if (delay)
			this.delay = delay

		this.destroyer$ = destroyer$
	}
}
