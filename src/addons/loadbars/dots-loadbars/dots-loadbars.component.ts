import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import { DotsLoadbarAnimation } from './animations';

@Component({
  selector: 'dots-loadbar',
  templateUrl: './dots-loadbars.component.html',
  styleUrl: './dots-loadbars.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    DotsLoadbarAnimation
  ]
})
export class DotsLoadbarsComponent extends LifeHooksFactory {
  constructor(){
    super()
  }

  @HostBinding("@DotsLoadbarAnimation")
  public override ngOnInit(): void {
    
  }
}
