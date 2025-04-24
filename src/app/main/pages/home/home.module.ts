import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {RouterModule, Routes} from "@angular/router"
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NgOptimizedImage
  ]
})
export class HomeModule { }
