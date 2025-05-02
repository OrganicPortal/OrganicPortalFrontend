import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {filter, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../../addons/models/models"
import {RouterRedirects} from "../../../../../../addons/states/states"
import * as AuthActions from "../../../../../store/actions/auth.actions"
import {StoreAuthType} from "../../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../../store/listeners/auth.listeners"
import {RecoveryPasswordGetTokenEffectData} from "../../../../../store/models/auth/auth.recovery-password"
import {AuthService} from "../../auth.service"


@Component({
	selector: "app-recovery-init",
	standalone: false,
	styleUrls: [
		"./recovery-init.component.scss", "../../shared/shared.styles.scss"
	],
	templateUrl: "./recovery-init.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [frameSideIn4]
})
export class RecoveryInitComponent extends LifeHooksFactory {
	public recoveryInitFg = new FormGroup({
		phone: new FormControl("", [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)])
	})
	public readonly loaderState$ = onInitLoader(true, false)
	protected readonly RouterRedirects = RouterRedirects

	constructor(
		private _authService: AuthService,
		private _authListeners: AuthListeners,
		private _router: Router,
		private _ngShortMessageService: NgShortMessageService,
		private _store: Store<StoreAuthType>
	) {
		super()
	}

	@HostBinding("@frameSideIn4")
	public override ngOnInit() {
		super.ngOnInit()

		const inputtedPhone = this._authService.inputtedPhoneForRecovery
		if (inputtedPhone)
			this.recoveryInitFg.get("phone")?.setValue(inputtedPhone)

		this._authListeners.authPasswordRecoveryState$
			.pipe(
				filter(el => el.isFetchSuccess),
				tap((el) => {
					this.loaderState$.next(new LoaderModel(true, el.isSuccessFetchToken))

					if (el.isSuccessFetchToken)
						this._router.navigate(["/auth/recovery/recovery-in-progress"], {
							queryParamsHandling: "merge",
							skipLocationChange: true,
							state: {
								recoveryToken: el.recoveryToken,
								phone: this.recoveryInitFg.get("phone")?.value
							}
						})
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	public onSubmit() {
		if (!this.recoveryInitFg.valid) {
			const message = "Форму заповнено не коректно"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const rawPhoneData = this.recoveryInitFg.get("phone")?.value ?? ""
		const model = new RecoveryPasswordGetTokenEffectData(rawPhoneData)

		this.loaderState$.next(new LoaderModel(false, false))

		this._store.dispatch(AuthActions.RecoveryPasswordFetchTokenInit(model))
	}
}
