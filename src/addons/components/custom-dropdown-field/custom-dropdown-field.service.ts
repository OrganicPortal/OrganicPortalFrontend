import {Injectable} from "@angular/core"
import {BehaviorSubject, Subject} from "rxjs"

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

	constructor(innerText: string, componentValue?: string) {
		this.innerText = innerText
		this.componentValue = componentValue
	}
}
