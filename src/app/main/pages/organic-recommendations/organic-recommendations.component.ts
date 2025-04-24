import {ChangeDetectionStrategy, Component} from "@angular/core"
import {textFramesSlideIn} from "../../../../addons/animations/shared.animations"

@Component({
  selector: 'app-organic-recommendations',
  standalone: false,
  templateUrl: './organic-recommendations.component.html',
  styleUrl: './organic-recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      textFramesSlideIn
  ]
})
export class OrganicRecommendationsComponent {

}
