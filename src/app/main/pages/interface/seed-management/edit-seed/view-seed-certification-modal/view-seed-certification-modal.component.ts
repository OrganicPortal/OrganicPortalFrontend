import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {LifeHooksFactory} from "@fixAR496/ngx-elly-lib"
import {BehaviorSubject} from "rxjs"
import {ISeedBaseDTO, SeedManagementService} from "../../seed-management.service"

@Component({
	selector: "view-seed-certification-modal",
	templateUrl: "./view-seed-certification-modal.component.html",
	styleUrl: "./view-seed-certification-modal.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	animations: []
})
export class ViewSeedCertificationModalComponent extends LifeHooksFactory {
	public readonly seedData$ = new BehaviorSubject<ISeedBaseDTO | undefined>(undefined)

	constructor(
		private _seedManagementService: SeedManagementService
	) {
		super()
	}

	public get allowedTreatmentTypes() {
		return this._seedManagementService.allowedTreatmentTypes
	}

	@Input() public set seedData(value: ISeedBaseDTO) {
		this.seedData$.next(value)
	}

	public override ngOnInit() {
		super.ngOnInit()
	}

	public onFindTreatmentType(treatmentType: number) {
		return this.allowedTreatmentTypes.find(el => el.enumType === treatmentType)
	}
}
