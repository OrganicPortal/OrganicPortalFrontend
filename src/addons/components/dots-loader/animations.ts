import { animate, style, transition, trigger } from "@angular/animations";

export const DotsLoadbarAnimation = trigger("DotsLoadbarAnimation", [
    transition(":enter", [
        style({ opacity: 0 }),
        animate(".3s ease", style("*"))
    ]),

    transition(":leave", [
        style("*"),
        animate(".3s ease", style({ opacity: 0 }))
    ])
])

export const fullScreenLoaderAnimation = trigger("fullScreenLoaderAnimation", [
    transition(":enter", [
        style({
            opacity: 0
        }),
        animate(".3s ease", style("*"))
    ]),

    transition(":leave", [
        style({
            opacity: 1
        }),
        animate(".3s ease", style({opacity: 0}))
    ])
])
