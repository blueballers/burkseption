import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Burger } from "../burger/burger.model";
import { BurgerService } from "../burger/burger.service";

@Component({
	selector: "app-burx-list",
	templateUrl: "./burx-list.component.html",
	styleUrls: ["./burx-list.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class BurxListComponent implements OnInit {
	burgers: Burger[];

	constructor(db: AngularFirestore, burgerService: BurgerService) {
		burgerService.burgers$.subscribe(burgers => {
			console.log(burgers);
			this.burgers = burgers;
		});
	}

	ngOnInit() {}
}
