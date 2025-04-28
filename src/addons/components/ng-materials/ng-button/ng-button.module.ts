import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgButtonComponent } from './ng-button.component';
import { MatRippleModule } from '@angular/material/core';
import { NgLayoutsModule } from '../ng-layouts/ng-layouts.module';

@NgModule({
  declarations: [NgButtonComponent],
  exports: [NgButtonComponent],
  imports: [
    CommonModule,
    NgLayoutsModule,
    MatRippleModule
  ]
})
export class NgButtonModule { }
