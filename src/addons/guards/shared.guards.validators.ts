import {Injectable} from "@angular/core"
import {Router} from "@angular/router"
import {combineLatest, filter, map, Observable, of, take, tap} from "rxjs"
import {AuthListeners} from "../../app/store/listeners/auth.listeners"
import {LocalStorageListeners} from "../../app/store/listeners/localstorage.listeners"
import {LOCAL_STORAGE_TOKEN_KEY} from "../../app/store/models/localstorage/models"
import {AllowedGroupsOfUsers, RedirectRuleItem, RedirectsValidationType} from "../states/states"

@Injectable({
	providedIn: "root"
})
export class SharedGuardsValidatorsService {
	private readonly authState$
	private readonly registrationState$
	private readonly localStorageState$

	constructor(
		private _authListeners: AuthListeners,
		private _localStorageListeners: LocalStorageListeners,
		private _router: Router
	) {
		this.authState$ = this._authListeners.authAuditorState$
		this.registrationState$ = this._authListeners.storeRegistrationState$
		this.localStorageState$ = this._localStorageListeners.localStorageState$
	}

	/**
	 * @description Будь-які користувачі
	 * @param redirectRules
	 * @constructor
	 */
	public AccessForAny(redirectRules: RedirectsValidationType): Observable<boolean> {
		return of(true).pipe(take(1))
	}

	/**
	 * @description Лише авторизовані користувачі
	 * @param redirectRules
	 * @constructor
	 */
	public AccessForOnlyAuthorized(redirectRules: RedirectsValidationType): Observable<boolean> {
		const triggerRule = redirectRules[AllowedGroupsOfUsers.OnlyAuthorized]

		return combineLatest([
			this.authState$
		]).pipe(
			filter(([el1]) => el1.isFetchSuccess),
			map(([el1]) => {
				if ((el1.isAuthUser && el1.isRequestComplete))
					return true

				this.onRedirectTo(triggerRule)
				return false
			}),
			take(1)
		)
	}

	/**
	 * @description Лише не авторизовані користувачі
	 * @param redirectRules
	 * @constructor
	 */
	public AccessForOnlyUnauthorized(redirectRules: RedirectsValidationType): Observable<boolean> {
		const triggerRule = redirectRules[AllowedGroupsOfUsers.OnlyUnauthorized]

		return combineLatest([
			this.authState$,
			this.localStorageState$
		]).pipe(
			filter(([el1, el2]) =>
				el1.isRequestComplete ||
				(!el1.isRequestComplete && el1.isFetchSuccess) ||
				!el2[LOCAL_STORAGE_TOKEN_KEY]
			),
			map(([el1, el2]) => {
				if (!(el1.isAuthUser && el1.isRequestComplete))
					return true

				this.onRedirectTo(triggerRule)
				return false
			}),
			take(1)
		)
	}

	/**
	 * @description Лише користувачі, які успішно заповнили та
	 * надіслали форму реєстрації та очікують підтвердження
	 * телефону за SMS-повідомленням
	 * @param redirectRules
	 * @constructor
	 */
	public AccessForOnlyWithConfirmRegistrationStep(redirectRules: RedirectsValidationType): Observable<boolean> {
		const triggerRule = redirectRules[AllowedGroupsOfUsers.OnlyWithConfirmRegistrationStep]

		return combineLatest([
			this.registrationState$,
			this.authState$,
			this.localStorageState$
		]).pipe(
			tap(([el1, el2, el3]) => {
				if (el2.isAuthUser){
					this.onRedirectTo(triggerRule)
					return
				}

				if(!el1.isRequestComplete){
					this.onRedirectTo(triggerRule)
					return
				}
			}),
			map(([el1]) => {
				if (el1.isFetchSuccess && !!el1.Data && el1.isRequestComplete)
					return true

				this.onRedirectTo(triggerRule)
				return true
			}),
			take(1)
		)
	}

	private onRedirectTo(rule: RedirectRuleItem | undefined): void {
		if (!rule) {
			this._router.navigate([""])
			return
		}

		this._router.navigate(rule.redirectTo, rule.extras)
	}

}

