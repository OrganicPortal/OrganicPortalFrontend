import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router"
import {LoginModule} from "../login/login.module"
import {AuthOverlayComponent} from "./auth-overlay.component"

export const routes: Routes = [
  {
    path: "",
    component: AuthOverlayComponent,
    children: [
      {
        path: "",
        loadChildren: () => LoginModule
      }
    ]
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
