import {IMyProfileDTO} from "../../../main/pages/my-profile/my-profile.service"

export class AuthAuditorReducerModel {
	isAuthUser: boolean = false
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
	userRoles?: IAuthGetRolesDTO["Data"] = []
	userInfo?: IMyProfileDTO["Data"] = undefined
	selectedCompany?: any
}

export class AuthAuditorPatchInfoModel {
	userRoles?: IAuthGetRolesDTO["Data"] = []
	userInfo?: IMyProfileDTO["Data"] = undefined
	selectedCompany?: any
}

export interface IAuthGetRolesDTO {
	Data: {
		Role: number
		CompanyId: number
	}[]
}
