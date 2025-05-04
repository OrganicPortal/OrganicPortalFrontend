import {ChangeDetectionStrategy, Component} from "@angular/core"
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Data} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Observable} from "rxjs"
import {MyProfileService} from "../my-profile.service"
import {containerAnimation} from "../shared/shared.animation"

@Component({
	selector: "app-personal-info",
	standalone: false,
	templateUrl: "./personal-info.component.html",
	styleUrls: [
		"./personal-info.component.scss",
		"../shared/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		containerAnimation
	]
})
export class PersonalInfoComponent extends LifeHooksFactory {
	public activatedRouteData$: Observable<Data>

	public formGroup = new FormGroup({
		FirstName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		LastName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		MiddleName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		Phone: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]),
	})

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _myProfileService: MyProfileService
	) {
		super()
		this.activatedRouteData$ = this._activatedRoute.data
		this._myProfileService.profileUpdater$.next()
	}

	public get profileData$() {
		return this._myProfileService.profileData$
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._myProfileService.profileData$.next(undefined)
	}
}
