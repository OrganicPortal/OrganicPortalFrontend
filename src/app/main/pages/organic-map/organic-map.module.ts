import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import {DotsLoaderModule} from "../../../../addons/components/dots-loader/dots-loader.module"
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
    DotsLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganicMapModule { }
