import {Injectable} from "@angular/core"
import {TypeOfInteractivityModel} from "./create-company/create-company.component"

@Injectable()
export class PersonalCompaniesService {
	public readonly typeOfInteractivityValues: TypeOfInteractivityModel[] = [
		new TypeOfInteractivityModel(
			"Виробництво та пакування насіння",
			0
		),

		new TypeOfInteractivityModel(
			"Дистрибуція та оптовий продаж насіння",
			1
		),

		new TypeOfInteractivityModel(
			"Роздрібна торгівля насінням, добривами, засобами захисту рослин (ЗЗР), тощо",
			2
		),

		new TypeOfInteractivityModel(
			"Селекція та виведення нових сортів",
			3
		),

		new TypeOfInteractivityModel(
			"Імпорт та експорт насіння або супутніх товарів",
			4
		)
	]

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
