import {ICompanyDTO, IMyProfileDTO} from "../../../main/pages/my-profile/my-profile.service"

export class AuthAuditorReducerModel {
	isAuthUser: boolean = false
	isFetchSuccess: boolean = true
	isRequestComplete: boolean = false
	userRoles?: IAuthGetRolesDTO["Data"] = []
	userInfo?: IMyProfileDTO["Data"] = undefined
	activeCompany?: ICompanyDTO
}

export class AuthAuditorPatchInfoModel {
	userRoles?: IAuthGetRolesDTO["Data"] = []
	userInfo?: IMyProfileDTO["Data"] = undefined
	activeCompany?: any
}

export class AuthAuditorSelectCompanyModel {
	activeCompany!: ICompanyDTO
}

export interface IAuthGetRolesDTO {
	Data: {
		Role: number
		CompanyId: number
	}[]
}


export class FullScreenLoaderReducerModel {
	delay: number | undefined = undefined
	isAnimating: boolean | undefined = false
}
