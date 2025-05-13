import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {BehaviorSubject} from "rxjs"
import {frameSideIn4} from "../../../../../../addons/animations/shared.animations"

@Component({
	selector: "app-product-info-modal",
	templateUrl: "./product-info-modal.component.html",
	styleUrls: [
		"./product-info-modal.component.scss",
		"../shared.styles.scss"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: [
		frameSideIn4
	]
})
export class ProductInfoModalComponent {
	public readonly viewData$: BehaviorSubject<SelectedHistoryCertModel | undefined> =
		new BehaviorSubject<SelectedHistoryCertModel | undefined>(undefined)

	@Input() public set viewData(value: SelectedHistoryCertModel | undefined) {
		this.viewData$.next(value)
	}
}

export class SelectedHistoryCertModel {
	qrCode: string
	accessKey: string
	historyKey: string

	constructor(qrCode: string, accessKey: string, historyKey: string) {
		this.qrCode = qrCode
		this.accessKey = accessKey
		this.historyKey = historyKey
	}
}
