import {Injectable} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router"
import {merge, Observable, of} from "rxjs"
import {AllowedGroupsOfUsers, EnumRouteExtended, RedirectsValidationForGroupsType} from "../states/states"
import {SharedGuardsValidatorsService} from "./shared.guards.validators"

@Injectable({
	providedIn: "root"
})
export class UserGroupsGuardService implements CanActivate {
	constructor(
		private _sharedGuardsValidatorsService: SharedGuardsValidatorsService
	) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const canActivateGroups: AllowedGroupsOfUsers[] = route.data[EnumRouteExtended.canActivateGroups] ?? []
		const redirectRules: RedirectsValidationForGroupsType = route.data[EnumRouteExtended.canActivateGroupsRedirectsIfValidationError] ?? []

		const isAccessForOnlyAuthorized = canActivateGroups.includes(AllowedGroupsOfUsers.OnlyAuthorized)
		const isAccessForOnlyUnauthorized = canActivateGroups.includes(AllowedGroupsOfUsers.OnlyUnauthorized)
		const isAccessForOnlyWithConfirmRegistrationStep = canActivateGroups.includes(AllowedGroupsOfUsers.OnlyWithConfirmRegistrationStep)
		const isAccessForOnlyWithInitPassRecovery = canActivateGroups.includes(AllowedGroupsOfUsers.OnlyWithInitPassRecovery)
		const isAccessForAny = canActivateGroups.includes(AllowedGroupsOfUsers.Any)

		let validators: Observable<boolean>[] = []

		if (isAccessForOnlyAuthorized)
			validators.push(this._sharedGuardsValidatorsService.AccessForOnlyAuthorized(redirectRules))

		if (isAccessForOnlyUnauthorized)
			validators.push(this._sharedGuardsValidatorsService.AccessForOnlyUnauthorized(redirectRules))

		if (isAccessForAny)
			validators.push(this._sharedGuardsValidatorsService.AccessForAny(redirectRules))

		if (isAccessForOnlyWithConfirmRegistrationStep)
			validators.push(this._sharedGuardsValidatorsService.AccessForOnlyWithConfirmRegistrationStep(redirectRules))

		if(isAccessForOnlyWithInitPassRecovery)
			validators.push(this._sharedGuardsValidatorsService.AccessForOnlyWithInitPassRecovery(redirectRules))

		if (validators.length == 0)
			return of(true)

		return merge(...validators)
	}
}
