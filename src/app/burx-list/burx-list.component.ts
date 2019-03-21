import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Burger } from "../burger/burger.model";
import { BurgerService } from "../burger/burger.service";
import { Observable } from "rxjs";

@Component({
	selector: "app-burx-list",
	templateUrl: "./burx-list.component.html",
	styleUrls: ["./burx-list.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class BurxListComponent implements OnInit {
	burgers$: Observable<Burger[]>;

	constructor(private burgerService: BurgerService) {
	}

	ngOnInit() {
		this.burgers$ = this.burgerService.getBurgers();
	}
}
