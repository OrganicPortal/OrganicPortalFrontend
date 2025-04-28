import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import { DotsLoadbarAnimation } from './animations';

@Component({
  selector: 'dots-loadbar',
  templateUrl: './dots-loader.component.html',
  styleUrls: ['./dots-loader.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    DotsLoadbarAnimation
  ]
})
export class DotsLoaderComponent extends LifeHooksFactory {
  constructor(){
    super()
  }

  @HostBinding("@DotsLoadbarAnimation")
  public override ngOnInit(): void {
    
  }
}
