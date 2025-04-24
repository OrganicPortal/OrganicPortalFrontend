import {animate, style, transition, trigger} from "@angular/animations"
import {CdkMenuTrigger} from "@angular/cdk/menu"
import {ChangeDetectionStrategy, Component, QueryList, ViewChildren} from "@angular/core"
import {LifeHooksFactory, ToastrService} from "@fixAR496/ngx-elly-lib"
import {
	BehaviorSubject,
	filter,
	fromEvent,
	map,
	merge,
	pairwise,
	startWith,
	Subject,
	switchMap,
	takeUntil,
	tap
} from "rxjs"
import {WrapperService} from "../wrapper.service"

@Component({
	selector: "app-header",
	standalone: false,
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("childMenuSlideIn", [
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
		])
	]
})
export class HeaderComponent extends LifeHooksFactory {
	public readonly selectedLink$ = new BehaviorSubject<ISelectedLink | undefined>(undefined)
	public readonly activeLink$ = new BehaviorSubject<ISelectedLink | undefined>(undefined)
	public readonly menusCloseHandler$ = new Subject<void>()

	public readonly headerLinks: IHeaderLink[] = [
		{
			title: "Органічна карта",
			href: "organic-map",
			icon: "map-point-rotate",
			children: []
		},

		{
			title: "Про органіку",
			href: "",
			icon: "map-point-rotate",
			children: [
				{
					title: "Історія розвитку",
					href: "history-of-development",
					icon: "history-2"
				},

				// {
				// 	title: "Загальне поняття",
				// 	href: "2",
				// 	icon: "palette-round"
				// },

				{
					title: "Законодавство",
					href: "legislation",
					icon: "medal-star-circle"
				}
			]
		},

		// {
		// 	title: "Сертифікація",
		// 	href: "",
		// 	icon: "map-point-rotate",
		// 	children: [
		// 		{
		// 			title: "Сертифікаційні органи",
		// 			href: "1",
		// 			icon: "notes"
		// 		},
		//
		// 		{
		// 			title: "Стандарти",
		// 			href: "2",
		// 			icon: "bookmark"
		// 		},
		//
		// 		{
		// 			title: "Процедура",
		// 			href: "3",
		// 			icon: "bug"
		// 		}
		// 	]
		// },

		// {
		// 	title: "Бібліотека",
		// 	href: "",
		// 	icon: "map-point-rotate",
		// 	children: [
		// 		{
		// 			title: "Корисні посилання",
		// 			href: "1",
		// 			icon: "three-squares"
		// 		},
		//
		// 		{
		// 			title: "Книжки",
		// 			href: "2",
		// 			icon: "winrar"
		// 		}
		// 	]
		// },

		{
			title: "Органічні технології",
			href: "",
			icon: "map-point-rotate",
			children: [
				{
					title: "Рекомендації",
					href: "organic-recommendations",
					icon: "three-squares"
				},
			]
		}

		//
		// new IHeaderLink("Органічна карта", "", "map-point-rotate"),
		// new IHeaderLink("Про органіку", "", "notebook"),
		// // new IHeaderLink("Сертифікація", "", "document-1"),
		// new IHeaderLink("Бібліотека", "", "book-bookmark"),
		// new IHeaderLink("Органічні технології", "", "flag-2")
	]

	@ViewChildren(CdkMenuTrigger) menus!: QueryList<CdkMenuTrigger>

	constructor(
		private _wrapperService: WrapperService,
		private _toastrService: ToastrService
	) {
		super()

		this._toastrService.onInitMessage("Дані успішно збережено!")
	}

	override ngOnInit(): void {
		super.ngOnInit()

		this._wrapperService.onListenScrollableEvents()
			.pipe(
				switchMap((el) => this.activeLink$),
				filter(el => !!el),
				tap(() => {
					this.onCloseAllMenus()
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()
	}

	override ngAfterViewInit(): void {
		super.ngAfterViewInit()

		this.menusCloseHandler$
			.pipe(
				tap(el => {
					this.menus.map(el => el.close())
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

		this.menus.map(el => {
			const a$ = el.opened.pipe(map(el => true))
			const b$ = el.closed.pipe(map(el => false))

			const menuData = el.menuData as any
			const elRef = menuData.elRef

			merge(fromEvent(elRef, "mouseenter")).pipe(
				map(el2 => {
					el.open()
				}),
				takeUntil(this.componentDestroy$)
			).subscribe()

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

	onClickToMenu(menuTrigger: CdkMenuTrigger, activeLink?: ISelectedLink) {
		const prevState = this.selectedLink$.getValue()

		if (prevState === activeLink && !!prevState) {
			menuTrigger.close()
			return
		}

		if (menuTrigger.isOpen())
			return

		const menuData = menuTrigger.menuData as any
		const link = menuData.link

		let obj: ISelectedLink = {
			linkRawData: link,
			menuTrigger: menuTrigger
		}


		menuTrigger.open()
	}

	onCloseAllMenus() {
		this.menusCloseHandler$.next()
	}

	onGetLinkHref(link: IHeaderLink) {
		if (!link.children || link.children.length == 0)
			return link.href

		return null
	}
}

export interface IHeaderLink {
	title: string
	href: string
	icon: string
	children?: IHeaderLink[]
}

export interface ISelectedLink {
	linkRawData: IHeaderLink
	menuTrigger: CdkMenuTrigger
}
