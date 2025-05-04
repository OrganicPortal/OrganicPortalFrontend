import {ChangeDetectionStrategy, Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Data, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, catchError, filter, map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel} from "../../../../../addons/models/models"
import {RoutesReservedQueryParams} from "../../../../../addons/states/states"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {AuthListeners} from "../../../../store/listeners/auth.listeners"
import {RecoveryPasswordGetTokenEffectData} from "../../../../store/models/auth/auth.recovery-password"
import {MyProfileService, UpdateUserProfileDTO} from "../my-profile.service"
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
		Phone: new FormControl("", [])
	})
	private readonly requestHandler$ = new Subject<void>()
	private readonly onRestorePassword$ = new BehaviorSubject<boolean>(false)

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _myProfileService: MyProfileService,
		private _store: Store<AuthActions.StoreAuthType>,
		private _router: Router,
		private _authListeners: AuthListeners,
		private _ngShortMessageService: NgShortMessageService
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

		this._authListeners.authPasswordRecoveryState$
			.pipe(
				filter(el => el.isFetchSuccess),
				switchMap((el) =>
					this.onRestorePassword$.pipe(
						filter(el => el),
						map(() => el)
					)
				),

				tap((el) => {
					this._myProfileService.loaderState$.next(new LoaderModel(true, el.isSuccessFetchToken))

					if (el.isSuccessFetchToken) {
						const navigationUrl = "/auth/recovery/recovery-in-progress"
						const navigationParams = {
							queryParamsHandling: "merge",
							skipLocationChange: true,
							queryParams: {
								[RoutesReservedQueryParams.redirectAfterClose]: this._router.url,
								backUrl: this._router.url
							},
							state: {
								recoveryToken: el.recoveryToken,
								phone: this.formGroup.get("Phone")?.value,
								backUrl: this._router.url
							}
						}

						this._router.navigate([{outlets: {"auth-overlay": ["auth-overlay"]}}], {
							skipLocationChange: true,
							state: {
								navigationUrl: navigationUrl,
								navigationParams: navigationParams
							}
						})
					}

				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this.profileData$.pipe(
			filter(el => !!el),
			tap((el) => {
				this.formGroup.get("FirstName")?.setValue(el?.Data.FirstName ?? "")
				this.formGroup.get("LastName")?.setValue(el?.Data.LastName ?? "")
				this.formGroup.get("MiddleName")?.setValue(el?.Data.MiddleName ?? "")
				this.formGroup.get("Phone")?.setValue(el?.Data.Phone ?? "")

				this._store.dispatch(AuthActions.AuthAuditorPatch({
					userInfo: el?.Data
				}))
			}),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public override ngOnDestroy() {
		super.ngOnDestroy()
		this._myProfileService.profileData$.next(undefined)
	}

	public onRestorePassword(phone: string) {
		const model = new RecoveryPasswordGetTokenEffectData(phone)
		this._myProfileService.loaderState$.next(new LoaderModel(false, false))
		this.onRestorePassword$.next(true)
		this._store.dispatch(AuthActions.RecoveryPasswordFetchTokenInit(model))
	}

	public onSubmit(userId?: number) {
		if (!userId) {
			const message = "Хибний ідентитфікатор користувача"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		if (!this.formGroup.dirty) {
			const message = "Не виявлено змін у формі"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		if (!this.formGroup.valid) {
			const message = "Форму заповнено не коректно"
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const model = new UpdateUserProfileDTO(
			userId,
			this.formGroup.get("FirstName")?.value ?? "",
			this.formGroup.get("LastName")?.value ?? "",
			this.formGroup.get("MiddleName")?.value ?? ""
		)

		this._myProfileService.loaderState$
			.next(new LoaderModel(false, false))

		this.requestHandler$.next()
		this._myProfileService
			.onUpdateProfileInfo(model)
			.pipe(
				tap(() => {
					this._myProfileService.profileUpdater$.next()
					this._myProfileService.loaderState$
						.next(new LoaderModel(true, false))
				}),

				catchError(async () => {
					this._myProfileService.loaderState$
						.next(new LoaderModel(true, false))
				}),

				takeUntil(this.requestHandler$),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}
}
