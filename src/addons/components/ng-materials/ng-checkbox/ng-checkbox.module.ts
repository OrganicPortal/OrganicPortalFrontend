import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import { NgCheckboxComponent } from './ng-checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatRippleModule } from '@angular/material/core';
import { NgLayoutsModule } from '../ng-layouts/ng-layouts.module';

@NgModule({
  declarations: [NgCheckboxComponent],
  exports: [NgCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxIconsModule,
    MatRippleModule,

    NgLayoutsModule
  ]
})
export class NgCheckboxModule { }
