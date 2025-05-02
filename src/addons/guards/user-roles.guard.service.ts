import {Injectable} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router"
import {filter, map, Observable} from "rxjs"
import {AuthListeners} from "../../app/store/listeners/auth.listeners"
import {AllowedRoles, EnumRouteExtended, RedirectsValidationForGroupsType} from "../states/states"

@Injectable({
	providedIn: "root"
})
export class UserRolesGuardService implements CanActivate {
	private readonly authState$

	constructor(
		private _authListeners: AuthListeners
	) {
		this.authState$ = this._authListeners.authAuditorState$
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const canActivateAllowedRoles: AllowedRoles[] = route.data[EnumRouteExtended.canActivateRoles] ?? []
		const redirectRules: RedirectsValidationForGroupsType = route.data[EnumRouteExtended.canActivateRolesRedirectsIfValidationError] ?? []

		// [TODO] – Оновити пайп для валідації за ролями.
		// [TODO] Передбачити розділення частин інтерфейсу для різних ролей користувача в різних компаніях
		return this.authState$.pipe(
			filter(el => el.isFetchSuccess),
			map((el) => {
				return true
			})
		)
	}
}
