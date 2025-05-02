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
	Visitor = "Visitor",
	User = "User",

	Owner = "Owner",
	Manager = "Manager",

	SysAdmin = "SysAdmin",
	SysManager = "SysManager",
}

//#endregion UserRoles

//#region GroupsOfUser
export enum AllowedGroupsOfUsers {
	Any = "Any",
	OnlyAuthorized = "OnlyAuthorized",
	OnlyUnauthorized = "OnlyUnauthorized",
	OnlyWithConfirmRegistrationStep = "OnlyWithConfirmRegistrationStep",
}
//#endregion GroupsOfUser

type AllowedRoleOrGroup = AllowedRoles | AllowedGroupsOfUsers

export type RedirectRuleItem = {
	redirectTo: any[],
	extras?: NavigationExtras
}

export type RedirectsValidationType = {
	[key in AllowedRoleOrGroup]?: RedirectRuleItem
}

export enum EnumRouteExtended {
	canActivateRoles = "canActivateRoles",
	canActivateGroups = "canActivateGroups",
	canActivateRedirectsIfValidationError = "canActivateRedirectsIfValidationError",
}


export type RouteExtension = Route & RouteExtended
export type RoutesExtended = RouteExtension[]

export type RouteExtended = {
	data?: {
		// Перелік ролей користувачів, яким дозволено доступ до маршруту
		[EnumRouteExtended.canActivateRoles]?: AllowedRoles[]
		// Перелік груп користувачів, яким дозволено доступ до маршруту
		[EnumRouteExtended.canActivateGroups]?: AllowedGroupsOfUsers[],
		// Правила редіректів у разі неотримання доступу до маршруту
		[EnumRouteExtended.canActivateRedirectsIfValidationError]?: RedirectsValidationType
	}

	children?: RouteExtended[]
}
