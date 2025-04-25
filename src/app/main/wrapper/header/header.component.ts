import {CdkMenuTrigger} from "@angular/cdk/menu"
import {ChangeDetectionStrategy, Component} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"

@Component({
	selector: "app-header",
	standalone: false,
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: []
})
export class HeaderComponent extends LifeHooksFactory {
	constructor() {
		super()
	}

	override ngOnInit(): void {
		super.ngOnInit()
	}

	override ngAfterViewInit(): void {
		super.ngAfterViewInit()
	}
}

export interface IHeaderLink {
	title: string
	href: string
	icon: string
	children?: IHeaderLink[]
}

export interface ISelectedLink {
	linkRawData: IHeaderLink
	menuTrigger: CdkMenuTrigger
}
