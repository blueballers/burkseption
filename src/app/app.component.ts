import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	title = "burkseption";

	toggleSubject: Subject<boolean> = new Subject<boolean>();
	constructor() { }

	ngOnInit() { }

	openSideNavigation() {
		this.toggleSubject.next(true);
	}
}
