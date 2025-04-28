import {ChangeDetectionStrategy, Component} from "@angular/core"
import {textFramesSideIn} from "../../../../addons/animations/shared.animations"

@Component({
  selector: 'app-organic-recommendations',
  standalone: false,
  templateUrl: './organic-recommendations.component.html',
  styleUrl: './organic-recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      textFramesSideIn
  ]
})
export class OrganicRecommendationsComponent {

}
