import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomRaisedButtonDirective} from "./custom-raised-button.directive"



@NgModule({
  declarations: [CustomRaisedButtonDirective],
  exports: [CustomRaisedButtonDirective],
  imports: [
    CommonModule
  ]
})
export class CustomRaisedButtonModule { }
