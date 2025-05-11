import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout"
import {Injectable} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Observable, shareReplay} from "rxjs"

export enum CustomBreakpoints {
	mw600 = "(max-width: 600px)",
	mw800 = "(max-width: 800px)",
	mw850 = "(max-width: 850px)",
	mw950 = "(max-width: 950px)",
	mw1080 = "(max-width: 1080px)",
	minW1080 = "(min-width: 1081px)",
}

@Injectable({providedIn: "root"})
export class BreakpointsService extends LifeHooksFactory {
	private breakpointsLogger
		= new Map<string, Observable<BreakpointState>>()

	constructor(
		private _breakpointObserver: BreakpointObserver
	) {
		super()

	}

	public onListenBreakpoint(breakpoint: keyof typeof Breakpoints | CustomBreakpoints | string) {
		return this.onSearchOrCreateListener(breakpoint)
	}

	public onListenXSmall() {
		const breakpoint = Breakpoints.XSmall
		return this.onSearchOrCreateListener(breakpoint)
	}

	private onSearchOrCreateListener(breakpoint: keyof typeof Breakpoints | CustomBreakpoints | string) {
		const loggedBreakpointState = this.breakpointsLogger.get(breakpoint)
		if (loggedBreakpointState) return loggedBreakpointState

		const obs$ = this._breakpointObserver
			.observe(breakpoint)
			.pipe(shareReplay())

		this.breakpointsLogger.set(breakpoint, obs$)
		return obs$
	}
}
