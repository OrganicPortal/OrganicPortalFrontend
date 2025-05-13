import {ClipboardModule} from "@angular/cdk/clipboard"
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {MatRippleModule} from "@angular/material/core"
import {MatTooltipModule} from "@angular/material/tooltip"
import {NgxIconsModule} from "@fixAR496/ngx-elly-lib"
import {
  ClipboardTextContainerModule
} from "../../../../../../addons/components/clipboard-text-container/clipboard-text-container.module"
import {DotsLoaderModule} from "../../../../../../addons/components/dots-loader/dots-loader.module"
import {ErrorLoadingModule} from "../../../../../../addons/components/error-loading/error-loading.module"
import {NgTitleModule} from "../../../../../../addons/components/ng-materials/ng-title/ng-title.module"
import {
  CustomRaisedButtonModule
} from "../../../../../../addons/directives/buttons/custom-raised-button/custom-raised-button.module"
import {CustomPipesModule} from "../../../../../../addons/pipes/custom.pipes.module"
import {ProductInfoModalComponent} from "./product-info-modal.component"



@NgModule({
  declarations: [ProductInfoModalComponent],
  exports: [ProductInfoModalComponent],
  imports: [
    CommonModule,

    NgTitleModule,
    NgxIconsModule,
    DotsLoaderModule,
    ErrorLoadingModule,
    NgOptimizedImage,
    ClipboardTextContainerModule,
    CustomPipesModule,
    CustomRaisedButtonModule,
    ClipboardModule,
    MatTooltipModule,
    MatRippleModule,
  ]
})
export class ProductInfoModalModule { }
