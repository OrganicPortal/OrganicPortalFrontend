import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {LoaderModel} from "../../../../../addons/models/models"
import {MyProfileService} from "../my-profile.service"

@Component({
	selector: "app-personal-companies",
	standalone: false,
	templateUrl: "./personal-companies.component.html",
	styleUrls: [
		"./personal-companies.component.scss",
		"../shared/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4
	]
})
export class PersonalCompaniesComponent extends LifeHooksFactory {
	constructor(
		private _myProfileService: MyProfileService
	) {
		super()
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._myProfileService.profileData$.next(undefined)
		this._myProfileService.loaderState$.next(new LoaderModel(false, false))
	}

}
