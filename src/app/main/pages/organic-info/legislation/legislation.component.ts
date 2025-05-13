import {ChangeDetectionStrategy, Component} from "@angular/core"
import {textFramesSideIn} from "../../../../../addons/animations/shared.animations"

@Component({
  selector: 'app-legislation',
  standalone: false,
  templateUrl: './legislation.component.html',
  styleUrl: './legislation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    textFramesSideIn
  ]
})
export class LegislationComponent {

}
