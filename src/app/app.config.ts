import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection} from "@angular/core"
import {provideClientHydration, withEventReplay} from "@angular/platform-browser"
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {JwtModule} from "@auth0/angular-jwt"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {EffectsModule} from "@ngrx/effects"
import {StoreModule} from "@ngrx/store"
import {HttpInterceptorService} from "../addons/services/http-interceptor.service"

import {routes} from "./app.routes"
import * as AuthActions from "./store/actions/auth.actions"
import * as LocalStorageActions from "./store/actions/localstorage.actions"
import {AuthEffects} from "./store/effects/auth.effects"
import {LocalStorageEffects} from "./store/effects/localstorage.effects"
import {LOCAL_STORAGE_TOKEN_KEY} from "./store/models/localstorage/models"
import * as AuthReducers from "./store/reducers/auth.reducers"
import * as LocalStorageReducers from "./store/reducers/localstorage.reducers"

export const HttpInterceptorProvider: Provider =
	{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideAnimations(),
		provideHttpClient(withFetch()),
		provideHttpClient(withInterceptorsFromDi()),

		importProvidersFrom(NgxIconsModule.forRoot(["custom-collection"])),
		importProvidersFrom(BrowserAnimationsModule),

		importProvidersFrom(
			EffectsModule.forRoot([
				AuthEffects,
				LocalStorageEffects
			])
		),

		importProvidersFrom(StoreModule.forRoot({
			[AuthActions.Actions.RegistrationReducerName]: AuthReducers.RegistrationReducer,
			[AuthActions.Actions.PhoneCodeConfirmationReducerName]: AuthReducers.PhoneConfirmationReducer,
			[AuthActions.Actions.ResendPhoneCodeReducerName]: AuthReducers.ResendPhoneCodeReducer,
			[AuthActions.Actions.RecoveryPasswordReducerName]: AuthReducers.AuthRecoveryPasswordReducer,
			[AuthActions.Actions.LoginReducerName]: AuthReducers.LoginReducer,
			[AuthActions.Actions.LogoutReducerName]: AuthReducers.LogoutReducer,
			[AuthActions.Actions.AuthAuditorReducerName]: AuthReducers.AuthAuditorReducer,

			[AuthActions.Actions.FullScreenLoaderReducerName]: AuthReducers.FullScreenLoaderReducer,
			[LocalStorageActions.Actions.LocalStorageOperationsReducerName]: LocalStorageReducers.StorageOperations,
			[LocalStorageActions.Actions.StorageStateReducerName]: LocalStorageReducers.StorageStates
		})),

		importProvidersFrom(
			JwtModule.forRoot({
				config: {
					tokenGetter: (request) => {
						const url = request?.url

						if (!url?.includes("api/"))
							return

						const entity = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) as string
						return JSON.parse(entity)
					}
				}
			})
		),

		HttpInterceptorProvider
	]
}
