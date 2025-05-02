import {AllowedRoles} from "../../../../addons/states/states"

export class AuthAuditorReducerModel {
	isAuthUser: boolean = false
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
	userRoles?: IAuthGetRolesDTO["Data"] = []
}

export interface IAuthGetRolesDTO {
	Data: {
		Role: number
		CompanyId: number
	}[]
}
