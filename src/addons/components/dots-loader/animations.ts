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