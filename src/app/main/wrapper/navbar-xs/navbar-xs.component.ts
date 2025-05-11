import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {map, Observable, of} from "rxjs"
import {AuthListeners} from "../../../store/listeners/auth.listeners"
import {AuthAuditorReducerModel} from "../../../store/models/auth/auth.auditor.models"

@Component({
	selector: "app-navbar-xs",
	templateUrl: "./navbar-xs.component.html",
	styleUrl: "./navbar-xs.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarXsComponent extends LifeHooksFactory {
	public readonly authAuditorState$!: Observable<AuthAuditorReducerModel>
	public readonly links!: NavbarXsLinkModel[]

	constructor(
		private _authListeners: AuthListeners
	) {
		super()
		this.authAuditorState$ = this._authListeners.authAuditorState$

		this.links = [
			new NavbarXsLinkModel("", of("home-1"), of("Головна")),
			new NavbarXsLinkModel("/organic-map", of("map-point-rotate"), of("Карта")),
			new NavbarXsLinkModel("/organic-recommendations", of("shield-star"), of("Технології")),
			new NavbarXsLinkModel("/interface",
				this.authAuditorState$.pipe(
					map(el => el.isFetchSuccess && el.isAuthUser ? "user-rounded" : "key")
				),
				this.authAuditorState$.pipe(
					map(el => el.isFetchSuccess && el.isAuthUser ? "Кабінет" : "Вхід")
				)
			)
		]
	}

	public override ngOnInit() {
		super.ngOnInit()
	}
}

export class NavbarXsLinkModel {
	href: string
	icon: Observable<string>
	tooltip: Observable<string>

	constructor(href: string, icon: Observable<string>, tooltip: Observable<string>) {
		this.href = href
		this.icon = icon
		this.tooltip = tooltip
	}
}
