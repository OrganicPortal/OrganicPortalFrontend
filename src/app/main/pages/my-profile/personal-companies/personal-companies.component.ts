import {ChangeDetectionStrategy, Component} from "@angular/core"
import {ActivatedRoute, Data} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Observable} from "rxjs"
import {MyProfileService} from "../my-profile.service"

@Component({
	selector: "app-personal-companies",
	standalone: false,
	templateUrl: "./personal-companies.component.html",
	styleUrls: [
		"./personal-companies.component.scss",
		"../shared/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalCompaniesComponent extends LifeHooksFactory {
	public activatedRouteData$: Observable<Data>
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _myProfileService: MyProfileService
	) {
		super()
		this.activatedRouteData$ = this._activatedRoute.data
		this._myProfileService.profileUpdater$.next()
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._myProfileService.profileData$.next(undefined)
	}

}
