import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import {DotsLoadbarsModule} from "../../../../addons/loadbars/dots-loadbars/dots-loadbars.module"
import { OrganicMapComponent } from './organic-map.component';


export const routes: Routes = [
  {
    path: "",
    component: OrganicMapComponent,
  }
]
@NgModule({
  declarations: [
    OrganicMapComponent
  ],
  imports: [
    CommonModule,
    DotsLoadbarsModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganicMapModule { }
