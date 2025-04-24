import {ChangeDetectionStrategy, Component} from "@angular/core"
import {BehaviorSubject} from "rxjs"
import {frameSlideOut, textFramesSlideIn} from "../../../../addons/animations/shared.animations"

@Component({
	selector: "app-organic-map",
	standalone: false,
	templateUrl: "./organic-map.component.html",
	styleUrl: "./organic-map.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		textFramesSlideIn,
		frameSlideOut
	]
})
export class OrganicMapComponent {
	public readonly loaderState$ = new BehaviorSubject<LoaderStateModel>(new LoaderStateModel(false, false))

	onLoadFrame() {
		this.loaderState$.next(new LoaderStateModel(true, false))
	}
}

export class LoaderStateModel {
	isLoaded: boolean
	isError: boolean


	constructor(isLoaded: boolean, isError: boolean) {
		this.isLoaded = isLoaded
		this.isError = isError
	}
}
