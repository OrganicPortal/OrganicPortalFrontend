import {Breakpoints, BreakpointState} from "@angular/cdk/layout"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {Observable} from "rxjs"
import {BreakpointsService, CustomBreakpoints} from "../../../../addons/services/breakpoints.service"
import {WrapperService} from "../wrapper.service"

@Component({
	selector: "app-header",
	standalone: false,
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: []
})
export class HeaderComponent extends LifeHooksFactory {
	public readonly breakPointForMw850$: Observable<BreakpointState>
	public readonly breakPointForMw1080$: Observable<BreakpointState>
	public readonly breakPointForMinW1080$: Observable<BreakpointState>
	public readonly breakPointForXSmall$: Observable<BreakpointState>

	constructor(
		private _breakpointsService: BreakpointsService,
		private _wrapperService: WrapperService,
	) {
		super()
		this.breakPointForXSmall$ = this._breakpointsService.onListenBreakpoint(Breakpoints.XSmall)
		this.breakPointForMw850$ = this._breakpointsService.onListenBreakpoint(CustomBreakpoints.mw850)
		this.breakPointForMw1080$ = this._breakpointsService.onListenBreakpoint(CustomBreakpoints.mw1080)
		this.breakPointForMinW1080$ = this._breakpointsService.onListenBreakpoint(CustomBreakpoints.minW1080)
	}

	public get isOpenedSidebar$(){
		return this._wrapperService.isOpenedSidebar$
	}

	override ngOnInit(): void {
		super.ngOnInit()
	}

	override ngAfterViewInit(): void {
		super.ngAfterViewInit()
	}
}
