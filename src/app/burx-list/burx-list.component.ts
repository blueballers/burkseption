import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
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
	burgers$ = this.burgerService.filteredBurgers$;

	searchFormGroup = new FormGroup({
		searchControl: new FormControl("")
	});
	data$$: Subscription;

	constructor(private burgerService: BurgerService) {}

	ngOnInit() {
		this.data$$ = this.searchFormGroup.controls.searchControl.valueChanges.subscribe(
			searchValue =>
				this.burgerService.filterBurgers({
					name: searchValue
				})
		);
	}

	ngOnDestroy() {
		this.data$$.unsubscribe();
	}
}
