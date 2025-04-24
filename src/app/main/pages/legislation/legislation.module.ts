import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import { LegislationComponent } from './legislation.component';

export const routes: Routes = [
  {
    path: "",
    component: LegislationComponent,
  }
]

@NgModule({
  declarations: [
    LegislationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LegislationModule { }
