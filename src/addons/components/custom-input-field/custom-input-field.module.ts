import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomInputModule} from "../../directives/inputs/custom-input/custom-input.module"
import {CustomInputFieldComponent} from "./custom-input-field.component"



@NgModule({
  declarations: [CustomInputFieldComponent],
  exports: [CustomInputFieldComponent],
  imports: [
    CommonModule,
    CustomInputModule
  ]
})
export class CustomInputFieldModule { }
