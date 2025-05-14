import {Injectable} from "@angular/core"

@Injectable()
export class PersonalCompaniesService {
	public readonly allowedContactTypes = [
		{
			name: "Phone number",
			icon: "phone-calling",
			value: 1
		}
	]

	public readonly legalTypeList = [
		{
			name: "Not specified",
			icon: "bill-list",
			value: 0
		},

		{
			name: "Individual entrepreneur (FOP)",
			icon: "user-rounded",
			value: 1
		},

		{
			name: "Limited Liability Company (LLC)",
			icon: "bookmark",
			value: 2
		}
	]

	constructor() {
	}
}
