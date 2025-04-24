import {animate, style, transition, trigger} from "@angular/animations"

export const textFramesSlideIn = trigger("textFramesSlideIn", [
	transition(":enter", [
		style({opacity: 0, transform: "translateX(-10px)"}),
		animate(".3s ease", style("*"))
	])
])


export const frameSlideOut = trigger("frameSlideOut", [
	transition(":leave", [
		style("*"),
		animate(".3s ease", style({opacity: 0, transform: "scale(.5)"}))
	])
])
