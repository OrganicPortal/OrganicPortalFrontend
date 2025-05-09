import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmedModalWindowService, IConfirmedModalWindow } from './confirmed-modal-window.service';
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations"
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'confirmed-modal-window',
    templateUrl: './confirmed-modal-window.component.html',
    styleUrl: './confirmed-modal-window.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("dynamicModalAnimation", [
            transition(":enter", [
                style({opacity: 0}),

                group([
                    animate(".2s ease", style("*")),
                    query("@dynamicModalItemAnimation", animateChild(), {optional: true}),
                    query("@parentStaggerAnimation", animateChild(), {optional: true}),
                    query("@confirmedModalAnimation", animateChild(), {optional: true})
                ])
            ]),

            transition(":leave", [
                group([
                    animate(".2s ease", style({opacity: 0}))
                ])
            ])
        ]),
        trigger("confirmedModalAnimation", [
            transition(":enter", [
                style({ opacity: "0", transform: "translateY(-20px)" }),
                animate(".3s ease", style("*"))
            ])
        ])
    ],
    standalone: false
})
export class ConfirmedModalWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  windowList: Array<IConfirmedModalWindow> = []
  private readonly unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private _confirmedModalWindowService: ConfirmedModalWindowService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._confirmedModalWindowService.onDetectModals$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.windowList = this._confirmedModalWindowService.modalWindowList
        this._cdr.detectChanges()
      })
  }

  onClickOfContainer(ev: any, elem: IConfirmedModalWindow) {
    let htmlEl = ev.target as HTMLElement

    if (htmlEl.classList.contains("modal-container"))
      this._confirmedModalWindowService.onDestroyMessageById(elem.id)
  }

  ngAfterViewInit(): void {
    this._confirmedModalWindowService.onInitModalsComponent$.next()
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next()
    this.unsubscribe$?.complete()
  }
}
