import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {takeUntil} from "rxjs"
import {LoaderModel} from "../../../../addons/models/models"
import {MyProfileService} from "./my-profile.service"

@Component({
	selector: "app-my-profile",
	standalone: false,
	templateUrl: "./my-profile.component.html",
	styleUrls: [
		"./my-profile.component.scss",
		"./shared/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileComponent extends LifeHooksFactory {
	constructor(
		public _myProfileService: MyProfileService
	) {
		super()
	}

	public get loaderState$() {
		return this._myProfileService.loaderState$
	}

	public override ngOnInit() {
		super.ngOnInit()

		this._myProfileService
			.onGetProfileHandler()
			.pipe(takeUntil(this.componentDestroy$))
			.subscribe()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this.loaderState$.next(new LoaderModel(false, false))
	}
}
