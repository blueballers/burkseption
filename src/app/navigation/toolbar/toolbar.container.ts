import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
	selector: "toolbar",
	templateUrl: "./toolbar.container.html",
	styleUrls: ["./toolbar.container.scss"]
})
export class ToolbarContainer implements OnInit {
	title = "burkseption";

	toggleSubject: Subject<boolean> = new Subject<boolean>();
	constructor() { }

	ngOnInit() { }

	openSideNavigation() {
		this.toggleSubject.next(true);
	}
}
