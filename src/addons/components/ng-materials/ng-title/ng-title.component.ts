import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core'

@Component({
    selector: 'ng-title',
    templateUrl: './ng-title.component.html',
    styleUrl: './ng-title.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NgTitleComponent {
    @Input() public titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'span'

    @HostBinding('class.subtitle')
    @Input() public isOpacity?: boolean = false

    @HostBinding('class.disable-padding')
    @Input() public isDisablePadding = false

    constructor() {
    }
}
