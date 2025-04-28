import {animate, AnimationBuilder, AnimationPlayer, style, transition, trigger} from "@angular/animations"
import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {map, takeUntil} from "rxjs"
import {NgShortMessageService, ShortMessageModel} from "../ng-short-message.service"

@Component({
	selector: "ng-short-message-view",
	templateUrl: "./ng-short-message-view.component.html",
	styleUrl: "./ng-short-message-view.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("progressBar", [
			transition("* => enable", [
				style({opacity: 1, transform: "translateX(0)"}),
				animate("{{delay}}ms linear", style({opacity: 1, transform: "translateX(100%)"}))
			], {params: {delay: 2000}})
		])
	],
	standalone: false
})
export class NgShortMessageViewComponent extends LifeHooksFactory {
	@Input() public message!: ShortMessageModel
	@Input() public isReflectToLeft: boolean = false

	@ViewChild("progressbar") progressbar!: ElementRef<HTMLElement>

	private animationPlayer!: AnimationPlayer

	constructor(
		private _ngShortMessageService: NgShortMessageService,
		private _animationBuilder: AnimationBuilder
	) {
		super()
	}

	public override ngOnInit(): void {
		super.ngOnInit()

		this.message.destroyer$?.pipe(
			map(el => this.onCloseMessageByBtn()),
			takeUntil(this.componentDestroy$)
		).subscribe()
	}

	public override ngAfterViewInit(): void {
		super.ngAfterViewInit()
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy()
	}

	onAutoCloseMessage() {
		if (this.message.isDoneParentAnimation && !this.message.isPauseOfMouseEnter && !this.message.destroyer$)
			this._ngShortMessageService.onDestroyMessage(this.message)
	}

	onCloseMessageByBtn() {
		this._ngShortMessageService.onDestroyMessage(this.message)
	}

	onMouseEnter() {
		if (this.message.destroyer$)
			return

		this.message.isPauseOfMouseEnter = true
		this.animationPlayer?.pause()
	}

	onMouseLeave() {
		if (this.message.destroyer$)
			return

		this.message.isPauseOfMouseEnter = false
		this.animationPlayer?.play()
	}

	onStartAnimation(event: any) {
		if (!this.message.isDoneParentAnimation)
			return

		const animationRenderer: any = (this._animationBuilder as any)._renderer
		const animationPlayers = animationRenderer.engine.players
		const player = animationPlayers.find((p: any) => p.element === event.element)
		this.animationPlayer = player
	}
}
