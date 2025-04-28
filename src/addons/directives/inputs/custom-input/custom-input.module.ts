import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomInputSuffixDirective} from "./custom-input-suffix.directive"
import {CustomInputDirective} from "./custom-input.directive"



@NgModule({
  declarations: [CustomInputDirective, CustomInputSuffixDirective],
  exports: [CustomInputDirective, CustomInputSuffixDirective],
  imports: [
    CommonModule,
  ]
})
export class CustomInputModule { }
