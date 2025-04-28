import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import {AuthOverlayComponent} from "./auth-overlay.component"

export const routes: Routes = [
  {
    path: "",
    component: AuthOverlayComponent,
  }
]

@NgModule({
  declarations: [AuthOverlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthOverlayModule { }
