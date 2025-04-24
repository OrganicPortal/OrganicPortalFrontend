import {ChangeDetectionStrategy, Component} from "@angular/core"
import {textFramesSlideIn} from "../../../../addons/animations/shared.animations"

@Component({
  selector: 'app-history-of-development',
  standalone: false,
  templateUrl: './history-of-development.component.html',
  styleUrl: './history-of-development.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      textFramesSlideIn
  ]
})
export class HistoryOfDevelopmentComponent {

}
