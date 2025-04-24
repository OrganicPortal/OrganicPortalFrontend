import {Injectable} from "@angular/core"
import {fromEvent, of, shareReplay} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class WrapperService {
	private wrapperScrollFrame: HTMLElement | null = null

	constructor() {
	}

	public set _wrapperScrollFrame(scrollFrame: HTMLElement) {
		this.wrapperScrollFrame = scrollFrame
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
