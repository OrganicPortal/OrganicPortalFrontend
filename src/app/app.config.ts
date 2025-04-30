import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection} from "@angular/core"
import {provideClientHydration, withEventReplay} from "@angular/platform-browser"
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {EffectsModule} from "@ngrx/effects"
import {StoreModule} from "@ngrx/store"
import {HttpInterceptorService} from "../addons/services/http-interceptor.service"

import {routes} from "./app.routes"
import * as AuthActions from "./store/actions/auth.actions"
import {AuthEffects} from "./store/effects/auth.effects"
import * as AuthReducers from "./store/reducers/auth.reducers"

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

		importProvidersFrom(EffectsModule.forRoot(AuthEffects)),
		importProvidersFrom(StoreModule.forRoot({
			[AuthActions.Actions.RegistrationReducerName]: AuthReducers.RegistrationReducer,
			[AuthActions.Actions.PhoneCodeConfirmationReducerName]: AuthReducers.PhoneConfirmationReducer,
			[AuthActions.Actions.ResendPhoneCodeReducerName]: AuthReducers.ResendPhoneCodeReducer,
			[AuthActions.Actions.LoginReducerName]: AuthReducers.LoginReducer
		})),

		// importProvidersFrom(
		// 	JwtModule.forRoot({
		// 		config: {
		// 			tokenGetter: () => {
		// 				const entity = localStorage.getItem(TOKEN_KEY) as string
		// 				return JSON.parse(entity)?.token
		// 			}
		// 		}
		// 	})
		// ),

		HttpInterceptorProvider
	]
}
