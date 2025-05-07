import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {map} from "rxjs"
import {frameSideIn4, frameSideInOut2} from "../../../../../../addons/animations/shared.animations"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {AllowedRoles} from "../../../../../../addons/states/states"
import {MyProfileService} from "../../my-profile.service"
import {containerAnimation} from "../../shared/shared.animation"

@Component({
	selector: "app-companies-list",
	standalone: false,
	templateUrl: "./companies-list.component.html",
	styleUrl: "./companies-list.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		frameSideIn4,
		frameSideInOut2,
		containerAnimation
	]
})
export class CompaniesListComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader()

	constructor(
		private _myProfileService: MyProfileService
	) {
		super()
		this.onReloadPage()
	}

	public get profileData$() {
		return this._myProfileService.profileData$
	}

	public get companies$() {
		return this.profileData$.pipe(
			map(el => el?.Data.CompanyList)
		)
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngAfterViewInit() {
		super.ngAfterViewInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
	}

	public onReloadPage() {
		this._myProfileService.profileUpdater$.next(this.loaderState$)
	}

	protected readonly AllowedRoles = AllowedRoles
}
