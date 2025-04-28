import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFxAlignDirective, NgFxDirective, NgFxGapDirective, NgFxLayoutDirective, NgFxWrapDirective } from './fx-layout/ng-fx-layout.directive';



@NgModule({
  declarations: [
    NgFxLayoutDirective,
    NgFxWrapDirective,
    NgFxAlignDirective,
    NgFxGapDirective,
    NgFxDirective
  ],
  exports: [
    NgFxLayoutDirective,
    NgFxWrapDirective,
    NgFxAlignDirective,
    NgFxGapDirective,
    NgFxDirective
  ],
  imports: [
    CommonModule
  ]
})
export class NgLayoutsModule { }
