import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations"

export const containerAnimation = trigger("containerAnimation", [
	transition(":enter", [
		style({height: "0", opacity: 0}),

		group([
			animate(".3s ease", style("*")),
			query("@*", animateChild(), {optional: true})
		]),
	]),
])
