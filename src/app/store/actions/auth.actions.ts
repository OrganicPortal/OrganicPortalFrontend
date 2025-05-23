import {createAction, props} from "@ngrx/store"
import {
	AuthAuditorPatchInfoModel,
	AuthAuditorReducerModel,
	AuthAuditorSelectCompanyModel, FullScreenLoaderReducerModel
} from "../models/auth/auth.auditor.models"
import {LoginEffectData, LoginReducerModel} from "../models/auth/auth.login.models"
import {LogoutReducerModel} from "../models/auth/auth.logout.models"
import {
	PhoneConfirmationEffectData,
	PhoneConfirmationReducerModel,
	PhoneConfirmationRegDataSetterModel
} from "../models/auth/auth.phone-confirmation.models"
import {
	AuthRecoveryPasswordReducerModel,
	RecoveryPasswordGetTokenEffectData,
	SaveRecoveredPasswordEffectData
} from "../models/auth/auth.recovery-password"
import {RegistrationReducerModel} from "../models/auth/auth.registration.models"
import {ResendPhoneCodeReducerModel} from "../models/auth/auth.resend-phone-code.models"

export enum Actions {
	LoginReducerName = "login",
	LoginInit = "[AUTH] Login init",
	LoginSuccess = "[AUTH] Login success",
	LoginFailure = "[AUTH] Login failure",
	LoginReset = "[AUTH] Login reset",

	LogoutReducerName = "logout",
	LogoutInit = "[AUTH] Logout init",
	LogoutSuccess = "[AUTH] Logout success",
	LogoutFailure = "[AUTH] Logout failure",
	LogoutReset = "[AUTH] Logout reset",

	RegistrationReducerName = "registration",
	RegistrationInit = "[AUTH] Registration init",
	RegistrationSuccess = "[AUTH] Registration success",
	RegistrationFailure = "[AUTH] Registration failure",
	RegistrationReset = "[AUTH] Registration reset",

	RecoveryPasswordReducerName = "recoveryPassword",
	RecoveryPasswordFetchTokenInit = "[AUTH] Recovery password fetch token init",
	RecoveryPasswordFetchTokenSuccess = "[AUTH] Recovery password fetch token success",
	RecoveryPasswordFetchTokenFailure = "[AUTH] Recovery password fetch token failure",
	RecoveryPasswordSaveInit = "[AUTH] Recovery password save init",
	RecoveryPasswordSaveSuccess = "[AUTH] Recovery password save success",
	RecoveryPasswordSaveFailure = "[AUTH] Recovery password save failure",
	RecoveryPasswordReset = "[AUTH] Recovery password reset",

	PhoneCodeConfirmationReducerName = "phoneCodeConfirmation",
	PhoneCodeConfirmationInit = "[AUTH] Phone code confirmation init",
	PhoneCodeConfirmationRegDataSetter = "[AUTH] Phone code confirmation set registration data",
	PhoneCodeConfirmationSuccess = "[AUTH] Phone code confirmation success",
	PhoneCodeConfirmationFailure = "[AUTH] Phone code confirmation failure",
	PhoneCodeConfirmationReset = "[AUTH] Phone code confirmation reset",

	ResendPhoneCodeReducerName = "resendCodeReducerName",
	ResendPhoneCodeInit = "[AUTH] Resend phone code init",
	ResendPhoneCodeSuccess = "[AUTH] Resend phone code success",
	ResendPhoneCodeFailure = "[AUTH] Resend phone code failure",
	ResendPhoneCodeReset = "[AUTH] Resend phone reset",

	AuthAuditorReducerName = "auditor",
	AuthAuditorInit = "[AUTH] Auditor init",
	AuthAuditorSuccess = "[AUTH] Auditor success",
	AuthAuditorPatch = "[AUTH] Auditor patch",
	AuthAuditorSelectCompany = "[AUTH] Auditor select company",
	AuthAuditorFailure = "[AUTH] Auditor failure",
	AuthAuditorReset = "[AUTH] Auditor reset",

	FullScreenLoaderReducerName = "fullScreenLoaderReducer",
	FullScreenLoaderInit = "[LOADER] Full Screen Loader init",
	FullScreenAnimationEnded = "[LOADER] Full Screen Animation Ended",
}


//#region Registration Actions
export const RegistrationInit = createAction(Actions.RegistrationInit)
export const RegistrationSuccess = createAction(Actions.RegistrationSuccess, props<RegistrationReducerModel>())
export const RegistrationFailure = createAction(Actions.RegistrationFailure, props<RegistrationReducerModel>())
export const RegistrationReset = createAction(Actions.RegistrationReset)
//#endregion Registration Actions


//#region Login Actions
export const LoginInit = createAction(Actions.LoginInit, props<LoginEffectData>())
export const LoginSuccess = createAction(Actions.LoginSuccess, props<LoginReducerModel>())
export const LoginFailure = createAction(Actions.LoginFailure, props<LoginReducerModel>())
export const LoginReset = createAction(Actions.LoginReset)
//#endregion Login Actions


//#region Logout Actions
export const LogoutInit = createAction(Actions.LogoutInit)
export const LogoutSuccess = createAction(Actions.LogoutSuccess, props<LogoutReducerModel>())
export const LogoutFailure = createAction(Actions.LogoutFailure, props<LogoutReducerModel>())
export const LogoutReset = createAction(Actions.LogoutReset)
//#endregion Logout Actions


//#region PhoneCodeConfirmation Actions
export const PhoneCodeConfirmationInit = createAction(Actions.PhoneCodeConfirmationInit, props<PhoneConfirmationEffectData>())
export const PhoneCodeConfirmationRegDataSetter = createAction(Actions.PhoneCodeConfirmationRegDataSetter, props<PhoneConfirmationRegDataSetterModel>())
export const PhoneCodeConfirmationSuccess = createAction(Actions.PhoneCodeConfirmationSuccess, props<PhoneConfirmationReducerModel>())
export const PhoneCodeConfirmationFailure = createAction(Actions.PhoneCodeConfirmationFailure, props<PhoneConfirmationReducerModel>())
export const PhoneCodeConfirmationReset = createAction(Actions.PhoneCodeConfirmationReset)
//#endregion PhoneCodeConfirmation Actions


//#region ResendPhoneCode Actions
export const ResendPhoneCodeInit = createAction(Actions.ResendPhoneCodeInit)
export const ResendPhoneCodeSuccess = createAction(Actions.ResendPhoneCodeSuccess)
export const ResendPhoneCodeFailure = createAction(Actions.ResendPhoneCodeFailure)
export const ResendPhoneCodeReset = createAction(Actions.ResendPhoneCodeReset)
//#endregion ResendPhoneCode Actions


//#region AuthAuditor Actions
export const AuthAuditorInit = createAction(Actions.AuthAuditorInit)
export const AuthAuditorSuccess = createAction(Actions.AuthAuditorSuccess, props<AuthAuditorReducerModel>())
export const AuthAuditorPatch = createAction(Actions.AuthAuditorPatch, props<AuthAuditorPatchInfoModel>())
export const AuthAuditorSelectCompany = createAction(Actions.AuthAuditorSelectCompany, props<AuthAuditorSelectCompanyModel>())
export const AuthAuditorFailure = createAction(Actions.AuthAuditorFailure, props<AuthAuditorReducerModel>())
export const AuthAuditorReset = createAction(Actions.AuthAuditorReset)
//#endregion AuthAuditor Actions


//#region Recovery Password
export const RecoveryPasswordFetchTokenInit =
	createAction(Actions.RecoveryPasswordFetchTokenInit, props<RecoveryPasswordGetTokenEffectData>())
export const RecoveryPasswordSaveInit =
	createAction(Actions.RecoveryPasswordSaveInit, props<SaveRecoveredPasswordEffectData>())
export const RecoveryPasswordFetchTokenSuccess =
	createAction(Actions.RecoveryPasswordFetchTokenSuccess, props<AuthRecoveryPasswordReducerModel>())
export const RecoveryPasswordSaveSuccess =
	createAction(Actions.RecoveryPasswordSaveSuccess, props<AuthRecoveryPasswordReducerModel>())
export const RecoveryPasswordFetchTokenFailure =
	createAction(Actions.RecoveryPasswordFetchTokenFailure, props<AuthRecoveryPasswordReducerModel>())
export const RecoveryPasswordSaveFailure =
	createAction(Actions.RecoveryPasswordSaveFailure, props<AuthRecoveryPasswordReducerModel>())

export const RecoveryPasswordReset =
	createAction(Actions.RecoveryPasswordReset)
//#endregion Recovery Password


export const FullScreenLoaderInit = createAction(Actions.FullScreenLoaderInit, props<{ delay: number }>())
export const FullScreenAnimationEnded = createAction(Actions.FullScreenAnimationEnded)


export type StoreAuthType = {
	[Actions.RegistrationReducerName]: RegistrationReducerModel,
	[Actions.PhoneCodeConfirmationReducerName]: PhoneConfirmationReducerModel,
	[Actions.ResendPhoneCodeReducerName]: ResendPhoneCodeReducerModel,
	[Actions.LoginReducerName]: LoginReducerModel,
	[Actions.LogoutReducerName]: LogoutReducerModel,
	[Actions.AuthAuditorReducerName]: AuthAuditorReducerModel,
	[Actions.RecoveryPasswordReducerName]: AuthRecoveryPasswordReducerModel,
	[Actions.FullScreenLoaderReducerName] : FullScreenLoaderReducerModel,
}
