import {animate, animateChild, group, query, sequence, stagger, style, transition, trigger} from "@angular/animations"
import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {textFramesSideIn} from "../../../../addons/animations/shared.animations"

@Component({
	selector: "app-home",
	standalone: false,
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("cardSlideIn", [
			transition(":enter", [
				style({opacity: 0, transform: "translateX(-20px)"}),
				animate(".5s ease", style("*"))
			])
		]),

		trigger("cardsSlideIn", [
			transition(":enter", [
				query("@cardSlideIn", stagger(150, animateChild()), {optional: true})
			])
		]),

		trigger("sectionCardsSlideIn", [

			transition(":enter", [
				style({opacity: 0, transform: "translateY(-20px)"}),

				sequence([
					animate(".2s ease", style("*")),
					query("@cardsSlideIn", animateChild(), {optional: true})
				])
			])
		]),


		trigger("sectionCardsTitleSlideIn", [
			transition(":enter", [
				style({opacity: 0, transform: "translateY(-20px)"}),
				animate(".2s ease", style("*"))
			])
		]),

		trigger("itemsSlideIn", [
			transition(":enter", [
				sequence([
					query("@textFramesSideIn",stagger(200, animateChild()), {optional: true}),
					query("@sectionCardsSlideIn", animateChild(), {optional: true})
				])
			])
		]),

		textFramesSideIn
	]
})
export class HomeComponent extends LifeHooksFactory {
	public readonly opportunitiesInfo: OpportunitiesModel[] = [
		new OpportunitiesModel(
			"ПРИДАТНІСТЬ ДО ОРГАНІКИ",
			"Наша система аналізує агрохімічні показники земельної ділянки і вказує наскільки придатна вона до органічного землевиробництва"
		),

		new OpportunitiesModel(
			"ПРАВИЛА СЕРТИФІКАЦІЇ",
			"Врахувавши ряд факторів, ми можемо підказати скільки коштів вам потрібно витратити для переходу до органічного землеробства"
		),

		new OpportunitiesModel(
			"ЕКОНОМІЧНА ЕФЕКТИВНІСТЬ",
			"Ми зібрали всю необхідну документацію для проходження сертифікації. Отримання сертифікату відкриває двері до нового ринку збуту"
		),

		new OpportunitiesModel(
			"ПЕРЕРОБКА ТА ЗБУТ",
			"Експерти нададуть інформацію про рекомендовані с/г культури, перехідний період, технології вирощування, заготівлі та переробки"
		)
	]

	constructor() {
		super()
	}

	@HostBinding("@itemsSlideIn")
	override ngOnInit() {
		super.ngOnInit()
	}
}

export class OpportunitiesModel {
	title: string
	desc: string

	constructor(title: string, desc: string) {
		this.title = title
		this.desc = desc
	}
}
