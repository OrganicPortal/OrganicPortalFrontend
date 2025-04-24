import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import { HistoryOfDevelopmentComponent } from './history-of-development.component';

export const routes: Routes = [
  {
    path: "",
    component: HistoryOfDevelopmentComponent,
  }
]

@NgModule({
  declarations: [
    HistoryOfDevelopmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryOfDevelopmentModule { }
