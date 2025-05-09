import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs"

@Injectable()
export class CustomDropdownFieldService {
	public readonly selectedOptionRef$ = new BehaviorSubject<SelectedDropdownItemModel | undefined>(undefined)
	public readonly initialValue$ = new BehaviorSubject<any>(undefined)

	constructor() {
	}
}

export class SelectedDropdownItemModel {
	innerText: string
	componentValue?: any
	isInitialValue: boolean = false

	constructor(innerText: string, componentValue?: string, isInitialValue?: boolean) {
		this.innerText = innerText
		this.componentValue = componentValue

		this.isInitialValue = !!isInitialValue
	}
}
