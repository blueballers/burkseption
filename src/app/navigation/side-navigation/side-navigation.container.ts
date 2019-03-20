import { Component, ViewChild, Input, OnInit, OnDestroy } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Observable, Subscription, merge } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import { filter, tap } from "rxjs/operators";

@Component({
	selector: "side-navigation-container",
	templateUrl: "./side-navigation.container.html"
})
export class SideNavigationContainer implements OnInit, OnDestroy {
	@Input() toggle$: Observable<boolean>;
	@ViewChild("sideNavBar") sideNavBar: MatSidenav;

	title = "burkseption";
	data$$: Subscription;

	constructor(private router: Router) { }

	ngOnInit() {
		const navigationEnd$ = this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			tap(() => {
				this.sideNavBar.close();
			})
		);

		const toggleSideNavbar$ = this.toggle$.pipe(
			tap(() => this.sideNavBar.toggle())
		);

		this.data$$ = merge(
			navigationEnd$,
			toggleSideNavbar$
		).subscribe();
	}

	ngOnDestroy() {
		if (this.data$$) {
			this.data$$.unsubscribe();
		}
	}
}
