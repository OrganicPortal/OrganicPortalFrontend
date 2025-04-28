import {provideHttpClient, withFetch} from "@angular/common/http"
import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from "@angular/core"
import {provideClientHydration, withEventReplay} from "@angular/platform-browser"
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations"
import {provideRouter} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"

import {routes} from "./app.routes"

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideAnimations(),
		provideHttpClient(withFetch()),

		importProvidersFrom(NgxIconsModule.forRoot(["custom-collection"])),
		importProvidersFrom(BrowserAnimationsModule),
	]
}
