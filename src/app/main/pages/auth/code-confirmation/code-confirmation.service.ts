import {Injectable} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Store} from "@ngrx/store"
import {BehaviorSubject, interval, map, shareReplay, startWith, Subject, switchMap, takeUntil, tap, timer} from "rxjs"
import * as AuthActions from "../../../../store/actions/auth.actions"
import {StoreAuthType} from "../../../../store/actions/auth.actions"

@Injectable()
export class CodeConfirmationService extends LifeHooksFactory {
	public readonly allowedRenewCode$ = new Subject<boolean>()
	public readonly timerInitializer$ = new BehaviorSubject<void>(undefined)

	public readonly renewCodeCollDown = 60 * 3 * 1000
	public date = new Date(0, 0, 0, 0, 0, 0, this.renewCodeCollDown)
	private readonly timerForDestroy$ = timer(this.renewCodeCollDown)
		.pipe(tap(() => this.allowedRenewCode$.next(true)))

	public readonly timerToRenew$
		= this.timerInitializer$.pipe(switchMap(() => interval(1000)
			.pipe(startWith(0), map(el => el + 1), takeUntil(this.componentDestroy$), takeUntil(this.timerForDestroy$))), map(() => {
			if (this.date.getSeconds() == 0 && this.date.getMinutes() == 0) return

			this.date.setSeconds(this.date.getSeconds() - 1)

			return {
				state: new Date(this.date), isView: this.date.getSeconds() == 0 && this.date.getMinutes() == 0
			}
		}),
		takeUntil(this.componentDestroy$)
	)

	constructor(
		private _store: Store<StoreAuthType>
	) {
		super()
	}

	public onListenCodeConfirmation() {
		return this._store.select(AuthActions.Actions.PhoneCodeConfirmationReducerName)
			.pipe(shareReplay())
	}

	public onResetDate() {
		this.date = new Date(0, 0, 0, 0, 0, 0, this.renewCodeCollDown)
		this.timerInitializer$.next()
		this.allowedRenewCode$.next(false)
	}

}
