import {HttpClient, HttpHeaders} from "@angular/common/http"
import {inject, Injectable} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {Action, Store} from "@ngrx/store"
import {catchError, exhaustMap, filter, map, Observable, of, switchMap, take, tap} from "rxjs"
import {NgShortMessageService} from "../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {RoutesRedirects} from "../../../addons/states/routes-redirects.service"
import * as AuthActions from "../actions/auth.actions"
import * as LocalStorageActions from "../actions/localstorage.actions"
import {AuthListeners} from "../listeners/auth.listeners"
import {LocalStorageListeners} from "../listeners/localstorage.listeners"
import {ILoginDTO, LoginEffectData} from "../models/auth/auth.login.models"
import {
	PhoneConfirmationEffectData,
	PhoneConfirmationRegDataSetterModel
} from "../models/auth/auth.phone-confirmation.models"
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

	constructor(private _ngShortMessageService: NgShortMessageService, private _localStorageListeners: LocalStorageListeners, private _activatedRoute: ActivatedRoute, private _authListeners: AuthListeners, private _http: HttpClient, private _router: Router, private _store: Store) {
	}

	private onAuditToken() {
		const apiUrl = "api/auth/refresh"

		return this._localStorageListeners.localStorageState$
			.pipe(
				filter(el => el.isSuccessParse),
				switchMap((el) => {
					if (!el[LOCAL_STORAGE_TOKEN_KEY]) {
						return of(AuthActions.AuthAuditorSuccess({
							isAuthUser: false, isRequestComplete: false, isFetchSuccess: true
						}))
					}

					return this._http.get(apiUrl).pipe(map(el => {
						return AuthActions.AuthAuditorSuccess({
							isAuthUser: true, isRequestComplete: true, isFetchSuccess: true
						})
					}), catchError(async (err) => {
						return AuthActions.AuthAuditorFailure({
							isAuthUser: false, isRequestComplete: false, isFetchSuccess: true
						})
					}))
				}))
	}

	private onLogin(payload: LoginEffectData) {
		const apiUrl = "api/auth/sign-in"
		return this._http.post<ILoginDTO>(apiUrl, payload.payload)
			.pipe(map(res => {
				const storageData = new UpdateOrSaveDataToStorageModel(LOCAL_STORAGE_TOKEN_KEY, res.Data.Token)

				this._store.dispatch(LocalStorageActions.RemoveFromStorage(new RemoveFromStorageModel(LOCAL_STORAGE_TOKEN_KEY)))
				this._store.dispatch(LocalStorageActions.UpdateOrSaveDataToStorage(storageData))

				this._store.dispatch(AuthActions.AuthAuditorSuccess({
					isAuthUser: true,
					isFetchSuccess: true,
					isRequestComplete: true
				}))

				return AuthActions.LoginSuccess({
					Data: (res.Data as any), isFetchSuccess: true, isRequestComplete: true
				})
			}), catchError(async (err) => {
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
					if (!state) {
						const message = "Заповніть реєстраційні дані на сторінці реєстрації."
						this._ngShortMessageService.onInitMessage(message, "info-circle")
						this._router.navigate([RoutesRedirects.registration], {queryParamsHandling: "merge"})
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
								this._router.navigate([RoutesRedirects.login], {queryParamsHandling: "merge"})
								return AuthActions.PhoneCodeConfirmationSuccess({
									...res, isFetchSuccess: true, isRequestComplete: true
								})
							}),

							catchError(async (err) => {
								return AuthActions.PhoneCodeConfirmationFailure({
									Error: err, isFetchSuccess: false, isRequestComplete: true
								})
							}))
				}), take(1))
	}

	private onRegister(payload: IRegistrationEffectData): Observable<(RegistrationReducerModel & Action)> {
		const apiUrl = "api/auth/sign-up"
		return this._http.post<IRegistrationDTO>(apiUrl, payload.payload)
			.pipe(
				switchMap(el => this.onRegisterSuccessTap(el)),
				map(res => {
					this._store.dispatch(AuthActions.PhoneCodeConfirmationRegDataSetter(new PhoneConfirmationRegDataSetterModel(res)))

					return AuthActions.RegistrationSuccess({
						...res, isFetchSuccess: true, isRequestComplete: true, isAccConfirmed: false
					})
				}),
				catchError(async (err) => {
					return AuthActions.RegistrationFailure({
						Error: err, isFetchSuccess: false, isRequestComplete: true, isAccConfirmed: false
					})
				}))
	}

	private onRegisterSuccessTap(data: IRegistrationDTO) {
		return this._activatedRoute.queryParams
			.pipe(map(el => {
				this._router.navigate([RoutesRedirects.phoneCodeConfirmation], {skipLocationChange: true})
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
}
