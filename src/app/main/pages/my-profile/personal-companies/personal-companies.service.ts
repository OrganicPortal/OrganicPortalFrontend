import {Injectable} from "@angular/core"

@Injectable()
export class PersonalCompaniesService {
	public readonly allowedContactTypes = [
		{
			name: "Мобільний телефон",
			icon: "phone-calling",
			value: 1
		}
	]

	public readonly legalTypeList = [
		{
			name: "Не вказано",
			icon: "bill-list",
			value: 0
		},

		{
			name: "Фіз. особа підприємець (ФОП)",
			icon: "user-rounded",
			value: 1
		},

		{
			name: "Товариство з обмеженою відповідальністю (ТОВ)",
			icon: "bookmark",
			value: 2
		}
	]

	constructor() {
	}
}
