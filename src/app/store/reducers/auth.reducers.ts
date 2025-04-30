import {createReducer, on} from "@ngrx/store"
import * as AuthActions from "../actions/auth.actions"
import {LoginReducerModel} from "../models/auth.login.models"
import {PhoneConfirmationReducerModel} from "../models/auth.phone-confirmation.models"
import {RegistrationReducerModel} from "../models/auth.registration.models"
import {ResendPhoneCodeReducerModel} from "../models/auth.resend-phone-code.models"

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
