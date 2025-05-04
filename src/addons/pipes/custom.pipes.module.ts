import {NgModule} from "@angular/core"
import {DateTimePipe} from "./datetime.pipe"

@NgModule({
	declarations: [
		DateTimePipe,
	],

	exports: [
		DateTimePipe,
	],
})
export class CustomPipesModule { }
