import {ElementRef, Injectable} from "@angular/core"
import {Router} from "@angular/router"
import {fromEvent, shareReplay} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class ListenersService {
	constructor(
		private _router: Router
	) {
	}

	public onListenEvent(eventName: string, elRef: ElementRef<HTMLElement>) {
		let el = elRef.nativeElement
		return fromEvent(el, eventName).pipe(shareReplay())
	}

	public onListenRouterNavigation() {
		return this._router.events.pipe(
			shareReplay()
		)
	}
}
