import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

//#region [ngFxLayout] – flex-direction prop
/**
 * Управління CSS–властивостями display та flex-direction
 */
@Directive({
    selector: '[ngFxLayout]',
    standalone: false
})
export class NgFxLayoutDirective implements OnInit {
  @Input() public set ngFxLayout(value: "column" | "row" | "row-reverse" | "column-reverse") {
    this.onApplySettings(value)
  }

  constructor(
    private _elem: ElementRef,
    private readonly _renderer2: Renderer2
  ) { }

  ngOnInit(): void {
  }

  onApplySettings(settings: string) {
    if (!settings || !this._elem?.nativeElement)
      return

    this._renderer2.setStyle(this._elem.nativeElement, "display", "flex")
    this._renderer2.setStyle(this._elem.nativeElement, "flex-direction", settings)
  }
}
//#endregion

//#region [ngFxAlign] – justify-content, align-items, align-content props
/**
 * Управління CSS–властивостями display та justify-content, align-items, align-content
 */
@Directive({
    selector: '[ngFxAlign]',
    standalone: false
})
export class NgFxAlignDirective {
  @Input() public set ngFxAlign(value: string) {
    this.onApplySettings(value)
  }

  constructor(
    private _elem: ElementRef,
    private readonly _renderer2: Renderer2
  ) { }

  ngOnInit(): void {
  }

  onApplySettings(settings: string) {
    if (!settings || !this._elem?.nativeElement)
      return

    let params = settings.split(" ")

    switch (params.length) {
      case 1: {
        this._renderer2.setStyle(this._elem.nativeElement, "justify-content", params)
        return
      }
      case 2:
        this._renderer2.setStyle(this._elem.nativeElement, "justify-content", params[0])
        this._renderer2.setStyle(this._elem.nativeElement, "align-items", params[1])
        this._renderer2.setStyle(this._elem.nativeElement, "align-content", params[1])
        return
      default:
        return
    }
  }
}
//#endregion 

//#region [ngFx] – flex prop
/**
 * Управління CSS–властивістю flex
 */
@Directive({
    selector: '[ngFx]',
    standalone: false
})
export class NgFxDirective implements OnInit {
  @Input() public set ngFx(value: string | number) {
    this.onApplySettings(value)
  }

  constructor(
    private _elem: ElementRef<HTMLElement>,
    private _renderer2: Renderer2
  ) { }

  ngOnInit(): void {
  }

  onApplySettings(settings: string | number) {
    if (!settings || !this._elem?.nativeElement)
      return

    this._renderer2.setStyle(this._elem.nativeElement, "flex", settings)
  }
}
//#endregion

//#region [ngFxGap] – gap prop
/**
 * Управління CSS–властивістю Gap
 */
@Directive({
    selector: '[ngFxGap]',
    standalone: false
})
export class NgFxGapDirective implements OnInit {
  @Input() public set ngFxGap(value: number | string) {
    this.onApplySettings(value)
  }

  constructor(
    private _elem: ElementRef<HTMLElement>,
    private _renderer2: Renderer2
  ) { }

  ngOnInit(): void {
  }

  onApplySettings(settings: number | string) {
    if (!settings || !this._elem?.nativeElement)
      return

    this._renderer2.setStyle(this._elem.nativeElement, "gap", isNaN(Number(settings)) ? settings : settings + 'px')
  }
}
//#endregion

//#region [ngFxGap] – flex-wrap prop
/**
 * Управління CSS–властивістю flex-wrap
 */
@Directive({
    selector: '[ngFxWrap]',
    standalone: false
})
export class NgFxWrapDirective implements OnInit {
  @Input() public set ngFxWrap(value: "nowrap" | "wrap" | "wrap-reverse") {
    this.onApplySettings(value)
  }

  constructor(
    private _elem: ElementRef<HTMLElement>,
    private _renderer2: Renderer2
  ) { }

  ngOnInit(): void {
  }

  onApplySettings(settings: "nowrap" | "wrap" | "wrap-reverse") {
    if (!settings || !this._elem?.nativeElement)
      return

    this._renderer2.setStyle(this._elem.nativeElement, "flex-wrap", settings)
  }
}
//#endregion