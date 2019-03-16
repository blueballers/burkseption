import { Component, OnInit, ViewEncapsulation } from "@angular/core";
// RXJS
import { Observable } from "rxjs";

// FIREBASE
import { AngularFirestore } from "@angular/fire/firestore";
import { Burger } from "../burger/burger.model";

@Component({
	selector: "app-burx-list",
	templateUrl: "./burx-list.component.html",
	styleUrls: ["./burx-list.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class BurxListComponent implements OnInit {
	burgers: Observable<Burger[]>;

	constructor(db: AngularFirestore) {
		this.burgers = db.collection<Burger>("items").valueChanges();
	}

	ngOnInit() { }
}
