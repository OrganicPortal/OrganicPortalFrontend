import {ElementRef, Injectable, Renderer2, RendererFactory2} from "@angular/core"

@Injectable({
	providedIn: "root"
})
export class ClassListFactoryService {
	private _renderer!: Renderer2

	constructor(
		private _rendererFactory: RendererFactory2
	) {
		this._renderer = this._rendererFactory.createRenderer(null, null)
	}

	public onAddClasses(elem: ElementRef<HTMLElement>, classList: string[]) {
		let elRef = elem.nativeElement
		classList.map(el => this._renderer.addClass(elRef, el))
	}
}
