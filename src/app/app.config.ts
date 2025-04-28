import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection} from "@angular/core"
import {provideClientHydration, withEventReplay} from "@angular/platform-browser"
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {HttpInterceptorService} from "../addons/services/http-interceptor.service"

import {routes} from "./app.routes"

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

		HttpInterceptorProvider
	]
}
