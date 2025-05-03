import {NavigationExtras, Route} from "@angular/router"

export enum RouterRedirects {
	login = "/auth/login",
	registration = "/auth/registration",
	phoneCodeConfirmation = "/auth/code-confirmation",
}

export enum RoutesReservedQueryParams {
	redirectAfterClose = "redirectAfterClose"
}

//#region UserRoles
export enum AllowedRoles {
	Visitor = 0,
	User = 1,

	Owner = 10,
	Manager = 11,

	SysAdmin = 99,
	SysManager = 100,
}

//#endregion UserRoles

//#region GroupsOfUser
export enum AllowedGroupsOfUsers {
	Any = "Any",
	OnlyAuthorized = "OnlyAuthorized",
	OnlyUnauthorized = "OnlyUnauthorized",
	OnlyWithInitPassRecovery = "OnlyWithInitPassRecovery",
	OnlyWithConfirmRegistrationStep = "OnlyWithConfirmRegistrationStep",
}

//#endregion GroupsOfUser

export type RedirectRuleItem = {
	redirectTo: any[],
	extras?: NavigationExtras
}

export type RedirectsValidationForGroupsType = {
	[key in AllowedGroupsOfUsers]?: RedirectRuleItem
}

export type RedirectsValidationForRolesType = {
	[key in AllowedRoles]?: RedirectRuleItem
}

export enum EnumRouteExtended {
	canActivateRoles = "canActivateRoles",
	canActivateGroups = "canActivateGroups",
	canActivateGroupsRedirectsIfValidationError = "canActivateGroupsRedirectsIfValidationError",
	canActivateRolesRedirectsIfValidationError = "canActivateRolesRedirectsIfValidationError",
}


export type RouteExtension = Route & RouteExtended
export type RoutesExtended = RouteExtension[]

export type RouteExtended = {
	data?: {
		// Перелік ролей користувачів, яким дозволено доступ до маршруту
		[EnumRouteExtended.canActivateRoles]?: AllowedRoles[]
		// Перелік груп користувачів, яким дозволено доступ до маршруту
		[EnumRouteExtended.canActivateGroups]?: AllowedGroupsOfUsers[],
		// Правила редіректів для груп користувачів у разі неотримання доступу до маршруту
		[EnumRouteExtended.canActivateGroupsRedirectsIfValidationError]?: RedirectsValidationForGroupsType,
		// Правила редіректів для ролей у разі неотримання доступу до маршруту
		[EnumRouteExtended.canActivateRolesRedirectsIfValidationError]?: RedirectsValidationForRolesType
	}

	children?: RouteExtended[]
}
