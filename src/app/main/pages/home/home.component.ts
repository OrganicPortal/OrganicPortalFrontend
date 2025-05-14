import {animate, animateChild, query, sequence, stagger, style, transition, trigger} from "@angular/animations"
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
					query("@textFramesSideIn", stagger(200, animateChild()), {optional: true}),
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
			"Suitability for Organics",
			"Our system analyzes the agrochemical indicators of the land plot and indicates how suitable it is for organic farming."
		),

		new OpportunitiesModel(
			"Certification Rules",
			"Considering a number of factors, we can suggest how much money you need to spend to transition to organic farming."
		),

		new OpportunitiesModel(
			"Economic Efficiency",
			"We have gathered all the necessary documentation for certification. Obtaining the certificate opens the door to a new market."
		),

		new OpportunitiesModel(
			"Processing and Sales",
			"Experts will provide information on recommended crops, the transition period, cultivation technologies, harvesting, and processing."
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
