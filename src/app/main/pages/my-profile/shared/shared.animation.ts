import {animate, style, transition, trigger} from "@angular/animations"

export const containerAnimation = trigger("containerAnimation", [
	transition(":enter", [
		style({height: 0, opacity: 0}),
		animate(".5s ease", style("*"))
	])
])
