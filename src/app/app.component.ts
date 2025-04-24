import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxToastrModule, ToastrService} from "@fixAR496/ngx-elly-lib"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private _toastrService: ToastrService) {
  }
}
