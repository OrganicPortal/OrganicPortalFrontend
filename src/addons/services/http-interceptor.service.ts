import {
	HttpContextToken,
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {catchError, Observable, of, tap, throwError} from "rxjs"
import {NgShortMessageService} from "../components/ng-materials/ng-short-message/ng-short-message.service"

@Injectable({providedIn: "root"})
export class HttpInterceptorService implements HttpInterceptor {
	constructor(
		private _ngShortMessageService: NgShortMessageService
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((el) => {
				const evt = el as any
				const message = evt?.body?.Message

				if (message) {
					this._ngShortMessageService.onInitMessage(message, "check-circle")
				}
			}),
			catchError((err: HttpErrorResponse) => {
				if (!req.url.includes("api"))
					return of()

				const message = err?.error?.Message ?? "Виникла невідома помилка під час відправки запиту"
				this._ngShortMessageService.onInitMessage(message, "info-circle")

				return throwError(() => err)
			})
		)
	}

	onDeserializeTokens(request: HttpRequest<any>): InterceptorSettingsModel {
		let _context = request.context as unknown as any
		let context = _context.map as Map<any, any>

		let contextData = Array.from(context).map(([name, value]) => ({name: name?.defaultValue(), value}))

		let settings = new InterceptorSettingsModel(false)

		contextData.map(el => {
			switch (el.name) {
				case "is-disable-validate-status-code":
					settings.isDisableValidateStatusCode = true
					break
				default:
					settings.isDisableValidateStatusCode = false
			}
		})

		return settings
	}
}

export const AllowedHttpContextTokens: Map<AllowedRequestTokensKeys, IRequestToken> = new Map()
	.set("DisableValidateStatusCode", {
		token: new HttpContextToken<string>(() => "is-disable-validate-status-code"),
		value: true
	})


interface IRequestToken {
	token: HttpContextToken<string>
	value: any
}

type AllowedRequestTokensKeys = "DisableValidateStatusCode"

class InterceptorSettingsModel {
	isDisableValidateStatusCode: boolean

	constructor(isDisableValidateStatusCode: boolean) {
		this.isDisableValidateStatusCode = isDisableValidateStatusCode
	}
}
