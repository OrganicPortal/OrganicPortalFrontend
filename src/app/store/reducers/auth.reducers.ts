import {createReducer, on} from "@ngrx/store"
import * as AuthActions from "../actions/auth.actions"
import {AuthAuditorReducerModel} from "../models/auth/auth.auditor.models"
import {LoginReducerModel} from "../models/auth/auth.login.models"
import {LogoutReducerModel} from "../models/auth/auth.logout.models"
import {PhoneConfirmationReducerModel} from "../models/auth/auth.phone-confirmation.models"
import {AuthRecoveryPasswordReducerModel} from "../models/auth/auth.recovery-password"
import {RegistrationReducerModel} from "../models/auth/auth.registration.models"
import {ResendPhoneCodeReducerModel} from "../models/auth/auth.resend-phone-code.models"

//#region Registration Reducer
export const RegistrationReducer = createReducer(
	new RegistrationReducerModel(),
	on(AuthActions.RegistrationInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false
			})
	),

	on(AuthActions.RegistrationSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isAccConfirmed: false,
				Error: undefined
			})
	),

	on(AuthActions.RegistrationFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isAccConfirmed: false,
				isRequestComplete: true
			})
	),

	on(AuthActions.RegistrationReset,
		(state, action) =>
			new RegistrationReducerModel()
	)
)
//#endregion Registration Reducer

//#region Login Reducer
export const LoginReducer = createReducer(
	new LoginReducerModel(),

	on(AuthActions.LoginInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false
			})
	),

	on(AuthActions.LoginSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: true
			})
	),

	on(AuthActions.LoginFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: false
			})
	),

	on(AuthActions.LoginReset,
		(state, action) =>
			new LoginReducerModel()
	)
)
//#endregion Login Reducer

//#region Logout Reducer
export const LogoutReducer = createReducer(
	new LogoutReducerModel(),

	on(AuthActions.LogoutInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false
			})
	),

	on(AuthActions.LogoutSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: true
			})
	),

	on(AuthActions.LogoutFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: false
			})
	),

	on(AuthActions.LogoutReset,
		(state, action) =>
			new LogoutReducerModel()
	)
)
//#endregion Login Reducer

//#region Phone Confirmation Reducer
export const PhoneConfirmationReducer = createReducer(
	new PhoneConfirmationReducerModel(),

	on(AuthActions.PhoneCodeConfirmationInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false
			})
	),

	on(AuthActions.PhoneCodeConfirmationRegDataSetter,
		(state, action) =>
			({...state, ...action})
	),

	on(AuthActions.PhoneCodeConfirmationSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: true,
				Error: undefined
			})
	),

	on(AuthActions.PhoneCodeConfirmationFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: false
			})
	),

	on(AuthActions.PhoneCodeConfirmationReset,
		(state, action) =>
			new PhoneConfirmationReducerModel()
	)
)
//#endregion Phone Confirmation Reducer

//#region Resend Phone Code Reducer
export const ResendPhoneCodeReducer = createReducer(
	new ResendPhoneCodeReducerModel(),

	on(AuthActions.ResendPhoneCodeInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false
			})
	),

	on(AuthActions.ResendPhoneCodeSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: true,
				Error: undefined
			})
	),

	on(AuthActions.ResendPhoneCodeFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: false
			})
	),

	on(AuthActions.ResendPhoneCodeReset,
		(state, action) =>
			new ResendPhoneCodeReducerModel()
	)
)
//#endregion Resend Phone Code Reducer

//#region Auth Auditor Reducer
export const AuthAuditorReducer = createReducer(
	new AuthAuditorReducerModel(),
	on(AuthActions.AuthAuditorInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isRequestComplete: false,
				userRoles: []
			})
	),

	on(AuthActions.AuthAuditorSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true
			})
	),

	on(AuthActions.AuthAuditorPatch,
		(state, action) =>
			({
				...state, ...action
			})
	),

	on(AuthActions.AuthAuditorFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isRequestComplete: false
			})
	),

	on(AuthActions.AuthAuditorReset,
		(state, action) =>
			new AuthAuditorReducerModel()
	)
)
//#endregion Auth Auditor Reducer

//#region Recovery Password Reducer
export const AuthRecoveryPasswordReducer = createReducer(
	new AuthRecoveryPasswordReducerModel(),
	on(AuthActions.RecoveryPasswordFetchTokenInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false
			})
	),

	on(AuthActions.RecoveryPasswordFetchTokenSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isSuccessFetchToken: true
			})
	),

	on(AuthActions.RecoveryPasswordFetchTokenFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isSuccessFetchToken: false
			})
	),

	on(AuthActions.RecoveryPasswordSaveInit,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: false,
				isSuccessSavePassword: false
			})
	),

	on(AuthActions.RecoveryPasswordSaveSuccess,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isSuccessSavePassword: true
			})
	),

	on(AuthActions.RecoveryPasswordSaveFailure,
		(state, action) =>
			({
				...state, ...action,
				isFetchSuccess: true,
				isSuccessSavePassword: false
			})
	),

	on(AuthActions.RecoveryPasswordReset,
		(state, action) =>
			new AuthRecoveryPasswordReducerModel()
	)
)
//#endregion Recovery Password Reducer
