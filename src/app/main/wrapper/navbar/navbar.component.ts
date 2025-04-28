import {animate, style, transition, trigger} from "@angular/animations"
import {CdkMenuTrigger} from "@angular/cdk/menu"
import {Component, QueryList, ViewChildren} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject, map, merge, pairwise, startWith, Subject, switchMap, takeUntil, tap} from "rxjs"
import {frameSideInOut3} from "../../../../addons/animations/shared.animations"
import {IHeaderLink, ISelectedLink} from "../header/header.component"
import {WrapperService} from "../wrapper.service"

@Component({
	selector: "app-navbar",
	standalone: false,
	templateUrl: "./navbar.component.html",
	styleUrl: "./navbar.component.scss",
	animations: [
		trigger("childMenuSideIn", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(-10px) scale(.9)"
				}),

				animate(".2s ease", style("*"))
			]),

			transition(":leave", [
				style("*"),

				animate(".2s ease", style({
					opacity: 0,
					transform: "translateX(-10px) scale(.9)"
				}))
			])
		]),

		frameSideInOut3
	]
})
export class NavbarComponent extends LifeHooksFactory {
	public readonly selectedLink$ = new BehaviorSubject<ISelectedLink | undefined>(undefined)
	public readonly activeLink$ = new BehaviorSubject<ISelectedLink | undefined>(undefined)
	public readonly menusCloseHandler$ = new Subject<void>()
	public readonly loginBtnHandler$ = new BehaviorSubject<boolean>(false)
	public readonly navLinks: any[] = [
		{
			title: "Головна",
			href: "",
			icon: "home-1",
			children: []
		},
		{
			title: "Органічна карта",
			href: "organic-map",
			icon: "map-point-rotate",
			children: []
		},
		{
			title: "Органічні технології",
			href: "organic-recommendations",
			icon: "shield-star",
			children: []
		},

		{
			title: "Про органіку",
			href: "",
			icon: "book-bookmark",
			children: [
				{
					title: "Історія розвитку",
					href: "history-of-development",
					icon: "history-2"
				},
				{
					title: "Законодавство",
					href: "legislation",
					icon: "medal-star-circle"
				}
			]
		}
	]

	@ViewChildren(CdkMenuTrigger) menus!: QueryList<CdkMenuTrigger>

	constructor(
		private _wrapperService: WrapperService
	) {
		super()
	}

	override ngOnInit() {
		super.ngOnInit()

		this._wrapperService.onListenScrollableEvents()
			.pipe(
				switchMap((el) => this.loginBtnHandler$.pipe(
					map(el2 => ({
						evt: el,
						isViewLoginBtn: el2
					}))
				)),

				tap(el => {
					let a = el.evt.target as HTMLElement

					if (a.scrollTop >= 70 && !el.isViewLoginBtn) {
						this.loginBtnHandler$.next(true)
						return
					}

					if (a.scrollTop < 70 && el.isViewLoginBtn)
						this.loginBtnHandler$.next(false)

				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()

		this.menusCloseHandler$
			.pipe(
				tap(() => this.menus.map(el => el.close())),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this.menus.map(el => {
			const a$ = el.opened.pipe(map(() => true))
			const b$ = el.closed.pipe(map(() => false))

			merge(a$, b$).pipe(
				map(el2 => ({
					triggerItem: el,
					isOpened: el2
				})),
				map(el => {
					const menuData = el.triggerItem.menuData as any
					const link = menuData.link

					if (el.isOpened) {
						let obj: ISelectedLink = {
							linkRawData: link,
							menuTrigger: el.triggerItem
						}

						this.selectedLink$.next(obj)
						this.activeLink$.next(obj)

						return
					}

					this.activeLink$.next(undefined)
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

			this.selectedLink$.pipe(
				startWith(undefined),
				pairwise(),
				tap(([el1, el2]) => {
					el1?.menuTrigger.close()
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
		})
	}

	public onGetLinkHref(link: IHeaderLink) {
		if (!link.children || link.children.length == 0)
			return link.href

		return null
	}

	private onCloseMenus() {
		this.menusCloseHandler$.next()
	}
}
