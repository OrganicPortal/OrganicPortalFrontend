import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, QueryList, ViewChildren} from "@angular/core"
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Data, Router} from "@angular/router"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {delay, filter, fromEvent, map, Observable, takeUntil, tap} from "rxjs"
import {frameSideIn4} from "../../../../../addons/animations/shared.animations"
import {
	NgShortMessageService
} from "../../../../../addons/components/ng-materials/ng-short-message/ng-short-message.service"
import {LoaderModel, onInitLoader} from "../../../../../addons/models/models"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {
	PhoneConfirmationEffectData,
	PhoneConfirmationModel
} from "../../../../store/models/auth/auth.phone-confirmation.models"
import {RecoveryPasswordGetTokenEffectData} from "../../../../store/models/auth/auth.recovery-password"
import {CodeConfirmationService} from "./code-confirmation.service"

const codeLen = 8

@Component({
	selector: "app-code-confirmation",
	templateUrl: "./code-confirmation.component.html",
	styleUrls: [
		"./code-confirmation.component.scss", "../shared/shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: [
		frameSideIn4
	]
})
export class CodeConfirmationComponent extends LifeHooksFactory {
	public readonly loaderState$ = onInitLoader()
	public currFocusInputIdx: number = -1
	@ViewChildren("codeInput", {read: ElementRef}) codeInputs!: QueryList<ElementRef<HTMLInputElement>>
	public readonly confirmationFg!: FormGroup
	public activatedRouteData$: Observable<Data>
	public routerExtras: any
	private controlValidators = [
		Validators.min(0),
		Validators.max(9),
		Validators.pattern("^[0-9]*$"),
		Validators.required,
		Validators.maxLength(1),
		Validators.minLength(1)
	]
	public readonly inputControls = Array.from(Array(codeLen).keys())
		.map(() => new FormControl({value: "", disabled: false}, this.controlValidators))

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _codeConfirmationService: CodeConfirmationService,
		private _store: Store<AuthActions.StoreAuthType>,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {
		super()
		this.confirmationFg = new FormGroup({code: new FormArray(this.inputControls)})
		this.activatedRouteData$ = this._activatedRoute.data
		this.routerExtras = this._router.getCurrentNavigation()?.extras
	}

	public get timerInitializer$() {
		return this._codeConfirmationService.timerInitializer$
	}

	public get timerToRenew$() {
		return this._codeConfirmationService.timerToRenew$
	}

	public get allowedRenewCode$() {
		return this._codeConfirmationService.allowedRenewCode$
	}

	@HostBinding("@frameSideIn4")
	public override ngOnInit() {
		super.ngOnInit()
		this.timerInitializer$.next()

		/**
		 * Переміщення між інпутами за допомогою клавіш "ArrowRight" & "ArrowLeft"
		 */
		fromEvent(document, "keydown")
			.pipe(
				filter((ev: any) => ev.code == "ArrowRight" || ev.code == "ArrowLeft"),
				map((el) => {
					const code = el.code == "ArrowRight" ? "next" : "prev"

					if (code == "next") {
						this.currFocusInputIdx++
						return this.onFocusInputByIdx(this.currFocusInputIdx)
					}

					this.currFocusInputIdx--
					return this.onFocusInputByIdx(this.currFocusInputIdx)
				}),
				delay(0),
				tap((el) => el?.select()),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this._codeConfirmationService
			.onListenCodeConfirmation()
			.pipe(
				tap((el) => {
					if (!el.isFetchSuccess && !el.isRequestComplete) {
						this.loaderState$.next(new LoaderModel(false, false))
						return
					}

					if (el.isFetchSuccess && el.isRequestComplete) {
						this.loaderState$.next(new LoaderModel(true, false))
						return
					}

					this.loaderState$.next(new LoaderModel(true, true))
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
		this.codeInputs.get(0)?.nativeElement.focus()
	}

	override ngOnDestroy() {
		super.ngOnDestroy()
		this._codeConfirmationService.onResetDate()
	}

	/**
	 * @description Input focus event
	 * @param input
	 * @param idx
	 */
	public onFocusInput(input: HTMLInputElement, idx: number) {
		this.currFocusInputIdx = idx
		input.select()
	}

	/**
	 * @description InputEvent
	 * @param evt
	 * @param triggerIdx
	 */
	public onInputValue(evt: any, triggerIdx: number) {
		if (this.isDeleteInput(evt.inputType)) {
			this.onFocusInputByIdx(triggerIdx - 1)
			return
		}

		const value = evt.target.value?.toString()

		if (value?.length > 1) {
			const control
				= this.inputControls?.find((el, idx) => idx === triggerIdx)
			control?.setValue(value[0])
		}

		this.onFocusInputByIdx(triggerIdx + 1)
	}

	public onKeydownInput(evt: KeyboardEvent) {
		const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
		const isV = evt.code === "KeyV"

		if (allowedKeys.includes(evt.key) ||
			(evt.ctrlKey && isV)
		) return

		if (!/^\d$/.test(evt.key))
			evt.preventDefault()
	}

	public onKeyupInput(evt: KeyboardEvent, input: HTMLInputElement, inputIdx: number) {
		if (evt.key === "Backspace" && !input.value) {
			this.onFocusInputByIdx(inputIdx - 1)
			return
		}
	}

	/**
	 * @description Paste event
	 * @param evt
	 * @param inputIdx
	 */
	public onPasteToInput(evt: any, inputIdx: number) {
		const text: string | undefined = evt.clipboardData.getData("text")

		if (!text)
			return

		text
			.split("")
			.map((el, idx) => {
				if (Number.isNaN(Number(el)))
					return

				const inputControl = this.inputControls
					.find((el, _idx) => inputIdx + idx === _idx)

				if (!inputControl)
					return

				inputControl.setValue(el)
			})
	}

	/**
	 * @description Resend SMS-code
	 * @param confirmationType
	 * @param isAllowedToRenew
	 */
	public onSendCode(confirmationType: "recovery-password" | "registration", isAllowedToRenew: boolean | null) {
		if (!isAllowedToRenew) {
			let message = `Спробуйте пізніше`
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		this.onResetDate()

		if (confirmationType == "registration") {
			this._store.dispatch(AuthActions.ResendPhoneCodeInit())
			return
		}

		const phone = this.routerExtras?.["state"]?.["phone"] ?? ""
		const model = new RecoveryPasswordGetTokenEffectData(phone)

		this._store.dispatch(AuthActions.RecoveryPasswordFetchTokenInit(model))
	}

	/**
	 * @description ngSubmit form
	 */
	public onSubmit(confirmationType: "recovery-password" | "registration") {
		if (!this.confirmationFg.valid) {
			let message = `Форму заповнено не коректно`
			this._ngShortMessageService.onInitMessage(message, "info-circle")
			return
		}

		const code = this.inputControls.map(el => el.value?.toString()).join("")
		const payload = new PhoneConfirmationModel(code)

		if (confirmationType == "registration") {
			this._store.dispatch(AuthActions.PhoneCodeConfirmationInit(new PhoneConfirmationEffectData(payload)))
			return
		}

		this._store.dispatch(AuthActions.RecoveryPasswordFetchTokenSuccess({
			phoneCode: code,
			isSuccessFetchToken: true,
			isFetchSuccess: true,
			isSuccessSavePassword: false
		}))

		this._router.navigate(["/auth/recovery/recovery-in-progress"], {
			queryParamsHandling: "merge",
			skipLocationChange: true
		})
	}


	/**
	 * @description Checks the type of input event
	 * (for additional logic when removing text from input)
	 * @param inputType
	 * @private
	 */
	private isDeleteInput(inputType: string) {
		return [
			"deleteContentBackward",
			"deleteContentForward",
			"deleteByCut",
			"deleteByDrag"
		].includes(inputType)
	}

	/**
	 * @description Focus input by input index
	 * @param nextInputIdx
	 * @private
	 */
	private onFocusInputByIdx(nextInputIdx: number) {
		const nextInput = this.codeInputs?.find((el, idx) => idx === nextInputIdx)

		if (!nextInput)
			return

		nextInput.nativeElement.focus()
		return nextInput.nativeElement
	}

	private onResetDate() {
		this._codeConfirmationService.onResetDate()
		this.confirmationFg.reset()
	}
}

