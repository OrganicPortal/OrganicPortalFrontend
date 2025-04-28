import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTitleComponent } from './ng-title.component';
import { NgLayoutsModule } from '../ng-layouts/ng-layouts.module';



@NgModule({
  declarations: [NgTitleComponent],
  exports: [NgTitleComponent],
  imports: [
    CommonModule,

    NgLayoutsModule
  ]
})
export class NgTitleModule { }
