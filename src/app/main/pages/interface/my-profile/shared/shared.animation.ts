import {animateChild, group, query, transition, trigger} from "@angular/animations"

export const containerAnimation = trigger("containerAnimation", [
	transition(":enter", [
		group([
			query("@*", animateChild(), {optional: true})
		])
	])
])
