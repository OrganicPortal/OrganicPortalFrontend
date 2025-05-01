import {Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject} from "rxjs"
import {frameSideInOut2} from "../../addons/animations/shared.animations"
import {ListenersService} from "../../addons/services/listeners.service"

@Component({
	selector: "app-main",
	standalone: false,
	templateUrl: "./main.component.html",
	styleUrl: "./main.component.scss",
	animations: [
		frameSideInOut2
	]
})
export class MainComponent extends LifeHooksFactory {
	public readonly isLoadingChunks$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _listenersService: ListenersService
	) {
		super()
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}
}
