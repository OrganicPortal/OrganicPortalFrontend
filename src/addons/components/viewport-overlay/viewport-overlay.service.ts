import {Injectable, TemplateRef} from "@angular/core"
import {BehaviorSubject} from "rxjs"

@Injectable({
	providedIn: "root"
})
export class ViewportOverlayService {
	public readonly overlayState$
		= new BehaviorSubject<TemplateRef<any> | undefined>(undefined)

	constructor() {
	}

	public onCloseOverlay() {
		this.overlayState$.next(undefined)

	}

	public onOpenOverlay(overlayContent: TemplateRef<any>) {
		this.overlayState$.next(overlayContent)
	}
}
