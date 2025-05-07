import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRippleModule} from "@angular/material/core"
import {RouterModule} from "@angular/router"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {CustomRaisedButtonModule} from "../../directives/buttons/custom-raised-button/custom-raised-button.module"
import {ErrorLoadingComponent} from "./error-loading.component"
import {RefreshButtonComponent} from "./refresh-button/refresh-button.component"



@NgModule({
  declarations: [ErrorLoadingComponent, RefreshButtonComponent],
  exports: [ErrorLoadingComponent, RefreshButtonComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    CustomRaisedButtonModule,
    NgxIconsModule,
    RouterModule
  ]
})
export class ErrorLoadingModule { }
