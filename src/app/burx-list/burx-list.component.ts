import {
	Component,
	OnInit,
	ViewEncapsulation,
	OnDestroy,
	HostBinding
} from "@angular/core";
import { BurgerService } from "../burger/burger.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
	selector: "app-burx-list",
	templateUrl: "./burx-list.component.html",
	styleUrls: ["./burx-list.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class BurxListComponent implements OnInit, OnDestroy {
	@HostBinding("class.app-burx-list") hostClass = true;

	burgers$ = this.burgerService.filteredBurgers$;
	searchFormGroup = new FormGroup({
		searchControl: new FormControl("")
	});
	search$$: Subscription;

	constructor(private burgerService: BurgerService) {}

	ngOnInit() {
		this.search$$ = this.searchFormGroup.controls.searchControl.valueChanges.subscribe(
			searchValue => this.burgerService.filterBurgers({
				name: searchValue
			})
		);
	}

	ngOnDestroy() {
		this.search$$.unsubscribe();
	}
}
