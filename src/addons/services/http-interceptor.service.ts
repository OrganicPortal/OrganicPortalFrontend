import {
	HttpContextToken,
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {Router} from "@angular/router"
import {Store} from "@ngrx/store"
import {catchError, Observable, of, tap, throwError} from "rxjs"
import * as AuthActions from "../../app/store/actions/auth.actions"
import * as LocalStorageActions from "../../app/store/actions/localstorage.actions"
import {LOCAL_STORAGE_TOKEN_KEY} from "../../app/store/models/localstorage/models"
import {NgShortMessageService} from "../components/ng-materials/ng-short-message/ng-short-message.service"

@Injectable({providedIn: "root"})
export class HttpInterceptorService implements HttpInterceptor {
	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _store: Store<AuthActions.StoreAuthType>,
		private _router: Router
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const deserializedTokens = this.onDeserializeTokens(req)

		return next.handle(req).pipe(
			tap((el) => {
				const evt = el as any
				const message = evt?.body?.Message

				if (message && !deserializedTokens.isDisableSendSuccessMessages) {
					this._ngShortMessageService.onInitMessage(message, "check-circle")
				}
			}),
			catchError((err: HttpErrorResponse) => {
				if (deserializedTokens.isDisableValidateStatusCode)
					return throwError(() => err)

				if (err?.status === 401) {
					const message = "Час дії сесії вичерпано. Будь ласка, виконайте повторний вхід."
					this._ngShortMessageService.onInitMessage(message, "info-circle")

					this._store.dispatch(LocalStorageActions.RemoveFromStorage({key: LOCAL_STORAGE_TOKEN_KEY}))
					this._store.dispatch(AuthActions.AuthAuditorReset())
					this._router.navigate([{outlets: {"auth-overlay": ["auth-overlay"]}}], {skipLocationChange: true})

					return throwError(() => err)
				}

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

		let settings = new InterceptorSettingsModel(false, false)
		contextData.map(el => {
			switch (el.name) {
				case "is-disable-validate-status-code":
					settings.isDisableValidateStatusCode = true
					break

				case "is-disable-send-success-messages":
					settings.isDisableSendSuccessMessages = true
					break
				default:
					settings.isDisableValidateStatusCode = false
			}
		})

		return settings
	}
}

export const AllowedHttpContextTokens = new Map<AllowedRequestTokensKeys, IRequestToken>()
	.set("DisableValidateStatusCode", {
		token: new HttpContextToken<string>(() => "is-disable-validate-status-code")
	})
	.set("DisableSendSuccessMessages", {
		token: new HttpContextToken<string>(() => "is-disable-send-success-messages")
	})

interface IRequestToken {
	token: HttpContextToken<string>
	customMessage?: string
}

type AllowedRequestTokensKeys = "DisableValidateStatusCode" | "SendMessageIfError" | "DisableSendSuccessMessages"

class InterceptorSettingsModel {
	isDisableValidateStatusCode: boolean
	isDisableSendSuccessMessages: boolean

	validateStatusCodeMessage?: string

	constructor(isDisableValidateStatusCode: boolean, isDisableSendSuccessMessages: boolean, validateStatusCodeMessage?: string) {
		this.isDisableValidateStatusCode = isDisableValidateStatusCode
		this.validateStatusCodeMessage = validateStatusCodeMessage
		this.isDisableSendSuccessMessages = isDisableSendSuccessMessages
	}
}
