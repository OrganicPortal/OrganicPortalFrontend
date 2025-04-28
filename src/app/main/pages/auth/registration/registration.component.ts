import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"

@Component({
	selector: "app-registration",
	standalone: false,
	templateUrl: "./registration.component.html",
	styleUrls: [
		"./registration.component.scss",
		"../shared/shared.styles.scss"
	],
	animations: [
		frameSideIn4
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent extends LifeHooksFactory {
	public registrationForm = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		lastName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		secondName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
		phone: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]),
		password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])
	})

	constructor(
		private _ngShortMessageService: NgShortMessageService
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	override ngOnInit() {
		super.ngOnInit()
	}

	public onSubmit() {
		if(this.registrationForm.invalid)
		{
			this._ngShortMessageService.onInitMessage("Форму заповнено не коректно", "close-circle")
			return
		}

	}
}
