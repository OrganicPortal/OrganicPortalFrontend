import {animate, animateChild, group, query, sequence, style, transition, trigger} from "@angular/animations"

export const textFramesSideIn = trigger("textFramesSideIn", [
	transition(":enter", [
		style({opacity: 0, transform: "translateX(-10px)"}),
		animate(".3s ease", style("*"))
	])
])


export const frameSideOut = trigger("frameSideOut", [
	transition(":leave", [
		style("*"),
		animate(".2s ease", style({opacity: 0, transform: "scale(.5)"}))
	])
])

export const frameSideOut2 = trigger("frameSideOut2", [
	transition(":leave", [
		style("*"),
		animate(".2s ease", style({opacity: 0}))
	])
])


export const frameSideIn2 = trigger("frameSideIn2", [
	transition(":enter", [
		style({opacity: 0}),

		group([
			animate(".2s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		])
	])
])

export const frameSideInOut2 = trigger("frameSideInOut2", [
	transition(":enter", [
		style({opacity: 0}),

		group([
			animate(".2s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		])
	]),

	transition(":leave", [
		style("*"),
		animate(".2s ease", style({opacity: 0}))
	])
])

export const frameSideInOut3 = trigger("frameSideInOut3", [
	transition(":enter", [
		style({opacity: 0, transform: "scale(.5)"}),
		animate(".2s ease", style("*"))
	]),

	transition(":leave", [
		style("*"),
		animate(".2s ease", style({opacity: 0, transform: "scale(.5)"}))
	])
])

export const frameSideInOut4 = trigger("frameSideInOut4", [
	transition(":enter", [
		style({opacity: 0, transform: "translateX(-10px)"}),
		group([
			animate(".2s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		])
	]),

	transition(":leave", [
		style("*"),

		group([
			animate(".2s ease", style({opacity: 0, transform: "translateX(-10px)"})),
			query("@*", animateChild(), {optional: true})
		])
	])
])

export const frameSideIn4 = trigger("frameSideIn4", [
	transition(":enter", [
		style({opacity: 0, transform: "translateX(-10px)"}),
		sequence([
			animate(".2s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		])
	])
])

export const frameSideIn5 = trigger("frameSideIn5", [
	transition(":enter", [
		style({opacity: 0, transform: "translateX(20px)"}),
		group([
			animate(".3s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		])
	])
])

export const frameSideOut4 = trigger("frameSideOut4", [
	transition(":leave", [
		style("*"),
		animate(".2s ease", style({opacity: 0, transform: "translateX(-10px)"}))
	])
])
