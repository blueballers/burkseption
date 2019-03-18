import { Injectable } from "@angular/core";
import { Burger } from "./burger.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class BurgerService {
	burgers$: Observable<Burger[]>;

	constructor(private db: AngularFirestore) {
    console.log("BURER SERVICE INIT")
		this.burgers$ = db.collection<Burger>("items").valueChanges();
	}
}
