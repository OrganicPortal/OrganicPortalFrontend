import {animate, style, transition, trigger} from "@angular/animations"

export const containerAnimation = trigger("containerAnimation", [
	transition(":enter", [
		style({height: "150px", opacity: 0}),
		animate(".3s ease", style("*"))
	]),
])
