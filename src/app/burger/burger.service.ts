import { Injectable } from "@angular/core";
import { Burger } from "./burger.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

interface BurgerFilter {
	name: string;
}

@Injectable({
	providedIn: "root"
})
export class BurgerService {
	initialFilter: BurgerFilter = {
		name: ""
	};

	burgers$ = this.db.collection<Burger>("items").valueChanges();
	private currentFilter$ = new BehaviorSubject<BurgerFilter>(
		this.initialFilter
	);

	filteredBurgers$ = combineLatest([this.currentFilter$, this.burgers$]).pipe(
		map(([filter, burgers]) =>
			burgers.filter(burger => burger.name.includes(filter.name))
		)
	);

	filterBurgers(filter: BurgerFilter) {
		this.currentFilter$.next(filter);
	}

	constructor(private db: AngularFirestore) {}
}
