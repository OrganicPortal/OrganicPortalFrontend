import {ChangeDetectionStrategy, Component} from "@angular/core"

@Component({
	selector: "app-auth-logo",
	templateUrl: "./auth-logo.component.html",
	styleUrl: "./auth-logo.component.scss",
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLogoComponent {

}
