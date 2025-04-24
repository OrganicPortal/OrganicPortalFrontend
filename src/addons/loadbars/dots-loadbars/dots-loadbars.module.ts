import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotsLoadbarsComponent } from './dots-loadbars.component';



@NgModule({
  declarations: [DotsLoadbarsComponent],
  exports: [DotsLoadbarsComponent],
  imports: [
    CommonModule
  ]
})
export class DotsLoadbarsModule { }
