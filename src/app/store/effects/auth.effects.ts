import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http"
import {inject, Injectable} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {Action, Store} from "@ngrx/store"
import {catchError, exhaustMap, filter, map, Observable, of, switchMap, take, tap} from "rxjs"
import {NgShortMessageService} from "../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {AllowedHttpContextTokens} from "../../../addons/services/http-interceptor.service"
import {RouterRedirects} from "../../../addons/states/states"
import {CodeConfirmation} from "../../main/pages/auth/auth.module"
import * as AuthActions from "../actions/auth.actions"
import * as LocalStorageActions from "../actions/localstorage.actions"
import {LocalStorageState} from "../actions/localstorage.actions"
import {AuthListeners} from "../listeners/auth.listeners"
import {LocalStorageListeners} from "../listeners/localstorage.listeners"
import {IAuthGetRolesDTO} from "../models/auth/auth.auditor.models"
import {ILoginDTO, LoginEffectData} from "../models/auth/auth.login.models"
import {
	PhoneConfirmationEffectData,
	PhoneConfirmationRegDataSetterModel
} from "../models/auth/auth.phone-confirmation.models"
import {
	IRecoveryTokenDTO,
	RecoveryPasswordGetTokenEffectData,
	SaveRecoveredPasswordEffectData
} from "../models/auth/auth.recovery-password"
import {
	IRegistrationDTO,
	IRegistrationEffectData,
	RegistrationReducerModel
} from "../models/auth/auth.registration.models"
import {
	LOCAL_STORAGE_TOKEN_KEY,
	RemoveFromStorageModel,
	UpdateOrSaveDataToStorageModel
} from "../models/localstorage/models"

@Injectable()
export class AuthEffects {
	private readonly actions$ = inject(Actions)

	private readonly registrationEffect$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.Actions.RegistrationInit),
			exhaustMap((data: IRegistrationEffectData) => this.onRegister(data))))

	private readonly regPhoneConfirmationEffect$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.Actions.PhoneCodeConfirmationInit),
			exhaustMap((data: PhoneConfirmationEffectData) => this.onPhoneConfirm(data))))

	private readonly resendPhoneCode$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.Actions.ResendPhoneCodeInit),
			exhaustMap(() => this.onResendPhoneRegistrationCode())))

	private readonly loginEffect$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.Actions.LoginInit),
			exhaustMap((data: LoginEffectData) => this.onLogin(data))))

	private readonly authAuditorEffect$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.Actions.AuthAuditorInit),
			exhaustMap(() => this.onAuditToken())))

	private readonly passwordRecoveryGetTokenEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.Actions.RecoveryPasswordFetchTokenInit),
			exhaustMap((data: RecoveryPasswordGetTokenEffectData) =>
				this.onGetRecoveryPasswordToken(data))
		)
	)

	private readonly passwordRecoverySetPasswordEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.Actions.RecoveryPasswordSaveInit),
			exhaustMap((data: SaveRecoveredPasswordEffectData) =>
				this.onSaveRecoveredPassword(data))
		)
	)

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _localStorageListeners: LocalStorageListeners,
		private _activatedRoute: ActivatedRoute,
		private _authListeners: AuthListeners,
		private _http: HttpClient,
		private _router: Router,
		private _store: Store<LocalStorageState>
	) {
	}

	private onAuditToken() {
		return this._localStorageListeners.localStorageState$
			.pipe(
				filter(el => el.isSuccessParse),
				switchMap((el) => {
					if (!el[LOCAL_STORAGE_TOKEN_KEY]) {
						return of(AuthActions.AuthAuditorSuccess({
							isAuthUser: false, isRequestComplete: false, isFetchSuccess: true
						}))
					}

					return this.onGetRoles()
				}))
	}

	private onGetRecoveryPasswordToken(payload: RecoveryPasswordGetTokenEffectData) {
		const apiUrl = "api/auth/recovery/init"

		return this._http.post<IRecoveryTokenDTO>(apiUrl, payload.payload).pipe(
			map((el) => {
				return AuthActions.RecoveryPasswordFetchTokenSuccess({
					isFetchSuccess: true,
					isSuccessFetchToken: true,
					isSuccessSavePassword: false,
					recoveryToken: el.Data.Token
				})
			}),

			catchError(async (err) => {
				return AuthActions.RecoveryPasswordFetchTokenFailure({
					isFetchSuccess: true,
					isSuccessFetchToken: false,
					isSuccessSavePassword: false,
					recoveryToken: undefined
				})
			})
		)
	}

	private onGetRoles() {
		const apiUrl = "api/auth/get-roles"

		const context = new HttpContext()
		const disableStatusCodeValidation = AllowedHttpContextTokens.get("DisableValidateStatusCode")!
		context.set(disableStatusCodeValidation.token, "")

		return this._http.get<IAuthGetRolesDTO>(apiUrl, {context: context}).pipe(
			map((el) => {
				return AuthActions.AuthAuditorSuccess({
					isAuthUser: true,
					isRequestComplete: true,
					isFetchSuccess: true,
					userRoles: el.Data
				})
			}),
			catchError(async () => {
				return AuthActions.AuthAuditorFailure({
					isAuthUser: false, isRequestComplete: false, isFetchSuccess: true
				})
			})
		)
	}

	private onLogin(payload: LoginEffectData) {
		const apiUrl = "api/auth/sign-in"
		return this._http.post<ILoginDTO>(apiUrl, payload.payload)
			.pipe(
				map(res => {
					const storageData = new UpdateOrSaveDataToStorageModel(LOCAL_STORAGE_TOKEN_KEY, res.Data.Token)

					this._store.dispatch(LocalStorageActions.RemoveFromStorage(new RemoveFromStorageModel(LOCAL_STORAGE_TOKEN_KEY)))
					this._store.dispatch(LocalStorageActions.UpdateOrSaveDataToStorage(storageData))
					return res
				}),

				switchMap((el) => this.onGetRoles().pipe(map(el1 => el))),

				map(el => {
					this.onResetBasicAuthAuditors()

					this._store.dispatch(AuthActions.AuthAuditorSuccess({
						isAuthUser: true,
						isFetchSuccess: true,
						isRequestComplete: true
					}))

					return AuthActions.LoginSuccess({
						Data: el.Data, isFetchSuccess: true, isRequestComplete: true
					})
				}),

				catchError(async (err) => {
					return AuthActions.LoginFailure({
						Error: err, isFetchSuccess: false, isRequestComplete: true
					})
				}))
	}

	private onPhoneConfirm(payload: PhoneConfirmationEffectData) {
		const apiUrl = "api/auth/sign-up/verif"

		return this._authListeners.storeRegistrationState$
			.pipe(
				tap((el) => {
					const state = !!(el.isRequestComplete && el.isFetchSuccess && el.Data)

					if (!state && el.isRequestComplete) {
						const message = "Заповніть реєстраційні дані на сторінці реєстрації."
						this._ngShortMessageService.onInitMessage(message, "info-circle")
						this._router.navigate([RouterRedirects.registration], {queryParamsHandling: "merge"})
					}
				}),
				filter(el => !!(el.isRequestComplete && el.isFetchSuccess && el.Data)),
				switchMap((el) => {
					const headers = new HttpHeaders({
						"RegToken": el.Data!.Token
					})

					return this._http.post(apiUrl, payload.payload, {headers: headers})
						.pipe(
							map(res => {
								this.onResetBasicAuthAuditors()
								this._router.navigate([RouterRedirects.login], {queryParamsHandling: "merge"})
								return AuthActions.PhoneCodeConfirmationSuccess({
									...res, isFetchSuccess: true, isRequestComplete: true
								})
							}),

							catchError(async (err) => {
								return AuthActions.PhoneCodeConfirmationFailure({
									Error: err, isFetchSuccess: false, isRequestComplete: true
								})
							}))
				}),
				take(1)
			)
	}

	private onRegister(payload: IRegistrationEffectData): Observable<(RegistrationReducerModel & Action)> {
		const apiUrl = "api/auth/sign-up"
		return this._http.post<IRegistrationDTO>(apiUrl, payload.payload)
			.pipe(
				switchMap(el => this.onRegisterSuccessTap(el)),
				map(res => {
					this._store.dispatch(AuthActions.PhoneCodeConfirmationRegDataSetter(new PhoneConfirmationRegDataSetterModel(res)))

					return AuthActions.RegistrationSuccess({
						...res, isFetchSuccess: true, isRequestComplete: true
					})
				}),
				catchError(async (err) => {
					return AuthActions.RegistrationFailure({
						Error: err, isFetchSuccess: false, isRequestComplete: true
					})
				}))
	}

	private onRegisterSuccessTap(data: IRegistrationDTO) {
		return this._activatedRoute.queryParams
			.pipe(map(() => {
				this._router.navigate([RouterRedirects.phoneCodeConfirmation], {
					state: {[CodeConfirmation.isRegSuccessful]: CodeConfirmation.isRegSuccessful},
					skipLocationChange: true,
					queryParamsHandling: "merge"
				})
				return data
			}), take(1))
	}

	private onResendPhoneRegistrationCode() {
		const apiUrl = "api/auth/sign-up/retry"

		return this._http.get(apiUrl)
			.pipe(
				map(() => AuthActions.ResendPhoneCodeSuccess()),
				catchError(async (err) => AuthActions.ResendPhoneCodeFailure())
			)
	}

	private onResetBasicAuthAuditors() {
		this._store.dispatch(AuthActions.LoginReset())
		this._store.dispatch(AuthActions.RegistrationReset())
		this._store.dispatch(AuthActions.PhoneCodeConfirmationReset())
		this._store.dispatch(AuthActions.RecoveryPasswordReset())
	}

	private onSaveRecoveredPassword(payload: SaveRecoveredPasswordEffectData) {
		const apiUrl = "api/auth/recovery/new-password"
		const headers = new HttpHeaders({
			"RecoveryToken": payload.recoveryToken
		})

		return this._http.post(apiUrl, payload.payload, {headers: headers}).pipe(
			map((el) => {
				this._router.navigate([RouterRedirects.login], {queryParamsHandling: "merge"})

				return AuthActions.RecoveryPasswordSaveSuccess({
					isFetchSuccess: true,
					isSuccessFetchToken: true,
					isSuccessSavePassword: true,
					recoveryToken: undefined
				})
			}),

			catchError(async (err) => {
				return AuthActions.RecoveryPasswordSaveFailure({
					isFetchSuccess: true,
					isSuccessFetchToken: true,
					isSuccessSavePassword: false,
					recoveryToken: undefined
				})
			})
		)

		// this._http.post(apiUrl, payload.payload).pipe(
		// 	map((el) => {
		// 		this._router.navigate([RouterRedirects.login], {queryParamsHandling: "merge"})
		//
		// 		return AuthActions.RecoveryPasswordSaveSuccess({
		// 			isFetchSuccess: true,
		// 			isSuccessFetchToken: true,
		// 			isSuccessSavePassword: true,
		// 			recoveryToken: undefined
		// 		})
		// 	}),
		//
		// 	catchError(async (err) => {
		// 		return AuthActions.RecoveryPasswordSaveFailure({
		// 			isFetchSuccess: true,
		// 			isSuccessFetchToken: true,
		// 			isSuccessSavePassword: false,
		// 			recoveryToken: undefined
		// 		})
		// 	})
		// )
	}
}
