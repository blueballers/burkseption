import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { LoginDialog } from "./dialogs/login.dialog";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "./auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
	toggleSubject: Subject<boolean> = new Subject<boolean>();

	data$$ = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
		this.isAuthenticated = isAuthenticated;
		this.cd.markForCheck();
	});
	isAuthenticated: boolean | undefined;

	constructor(
		public authService: AuthService,
		private dialog: MatDialog,
		private cd: ChangeDetectorRef
	) {
	}

	ngOnDestroy() {
		this.data$$.unsubscribe();
	}

	openSideNavigation() {
		this.toggleSubject.next(true);
	}

	openLoginDialog(): void {
		if (this.isAuthenticated === undefined) {
			return;
		}

		this.dialog.open(LoginDialog).afterClosed().subscribe(result => {
			console.log("The login dialog was closed", result);
		});
	}

	logOut() {
		this.authService.logout();
	}
}
