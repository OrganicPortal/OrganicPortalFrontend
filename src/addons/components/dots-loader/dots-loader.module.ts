import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotsLoaderComponent } from './dots-loader.component';



@NgModule({
  declarations: [DotsLoaderComponent],
  exports: [DotsLoaderComponent],
  imports: [
    CommonModule
  ]
})
export class DotsLoaderModule { }
