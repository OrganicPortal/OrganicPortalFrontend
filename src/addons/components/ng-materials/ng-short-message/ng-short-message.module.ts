import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import { NgShortMessageComponent } from './ng-short-message.component';
import { NgShortMessageViewComponent } from './ng-short-message-view/ng-short-message-view.component';
import { NgButtonModule } from '../ng-button/ng-button.module';
import { NgTitleModule } from '../ng-title/ng-title.module';
import { NgLayoutsModule } from '../ng-layouts/ng-layouts.module';

@NgModule({
  declarations: [NgShortMessageComponent, NgShortMessageViewComponent],
  exports: [NgShortMessageComponent, NgShortMessageViewComponent],
  imports: [
    CommonModule,

    NgLayoutsModule,
    NgButtonModule,
    NgTitleModule,
    NgxIconsModule
  ]
})
export class NgShortMessageModule { }
