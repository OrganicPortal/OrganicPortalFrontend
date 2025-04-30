import {createAction, props} from "@ngrx/store"
import {LoginEffectData, LoginReducerModel} from "../models/auth/auth.login.models"
import {
	PhoneConfirmationEffectData,
	PhoneConfirmationReducerModel,
	PhoneConfirmationRegDataSetterModel
} from "../models/auth/auth.phone-confirmation.models"
import {RegistrationReducerModel} from "../models/auth/auth.registration.models"
import {ResendPhoneCodeReducerModel} from "../models/auth/auth.resend-phone-code.models"

export enum Actions {
	LoginReducerName = "login",
	LoginInit = "[AUTH] Login init",
	LoginSuccess = "[AUTH] Login success",
	LoginFailure = "[AUTH] Login failure",
	LoginReset = "[AUTH] Login reset",

	RegistrationReducerName = "registration",
	RegistrationInit = "[AUTH] Registration init",
	RegistrationSuccess = "[AUTH] Registration success",
	RegistrationFailure = "[AUTH] Registration failure",
	RegistrationReset = "[AUTH] Registration reset",

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
	AuthAuditorFailure = "[AUTH] Auditor failure",
	AuthAuditorReset = "[AUTH] Auditor reset",
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
export const AuthAuditorSuccess = createAction(Actions.AuthAuditorSuccess, props<RegistrationReducerModel>())
export const AuthAuditorFailure = createAction(Actions.AuthAuditorFailure, props<RegistrationReducerModel>())
export const AuthAuditorReset = createAction(Actions.AuthAuditorReset)
//#endregion AuthAuditor Actions


export type StoreAuthType = {
	[Actions.RegistrationReducerName]: RegistrationReducerModel,
	[Actions.PhoneCodeConfirmationReducerName]: PhoneConfirmationReducerModel,
	[Actions.ResendPhoneCodeReducerName]: ResendPhoneCodeReducerModel,
	[Actions.LoginReducerName]: LoginReducerModel,
}
