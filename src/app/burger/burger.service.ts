import { Injectable } from "@angular/core";
import { Burger } from "./burger.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class BurgerService {
	private burgers$: Observable<Burger[]>;

	constructor(private db: AngularFirestore) {
		this.burgers$ = this.db.collection<Burger>("items").valueChanges();
	}

	getBurgers() {
		return this.burgers$;
	}
}
