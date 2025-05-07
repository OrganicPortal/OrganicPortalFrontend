import {Injectable} from "@angular/core"
import {fromEvent, of, shareReplay} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class WrapperService {
	private wrapperScrollFrame: Document | HTMLElement | null = null

	constructor() {
	}

	public set _wrapperScrollFrame(scrollFrame: HTMLElement) {
		// this.wrapperScrollFrame = scrollFrame
		this.wrapperScrollFrame = document
	}


	public onListenScrollableEvents() {
		if (!this.wrapperScrollFrame)
			return of()

		const wrapper = this.wrapperScrollFrame

		return fromEvent(wrapper, "scroll").pipe(
			shareReplay()
		)
	}
}
