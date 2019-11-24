import { Component, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
	selector: "login-dialog",
	templateUrl: "./login.dialog.html",
	styleUrls: ["./login.dialog.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialog {
	@HostBinding("class.login-dialog") hostClass = true;

	emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	formGroup = new FormGroup({
		email: new FormControl("", [
			Validators.required,
			Validators.pattern(this.emailregex)
		]),
		password: new FormControl("", [Validators.required])
	});
	logInError: string | undefined;

	constructor(
		public dialogRef: MatDialogRef<LoginDialog>,
		private authService: AuthService,
		private cd: ChangeDetectorRef
	) {
	}

	register() {
		this.authService.register(this.formGroup.controls.email.value, this.formGroup.controls.password.value)
			.then(() => this.dialogRef.close())
			.catch(error => {
				this.logInError = error.message;
				this.cd.markForCheck();
			});
	}

	cancel() {
		this.dialogRef.close();
	}

	login() {
		if (this.formGroup.invalid) {
			return;
		}

		this.logInError = undefined;
		this.authService.login(this.formGroup.controls.email.value, this.formGroup.controls.password.value)
			.then(() => this.dialogRef.close())
			.catch(error => {
				this.logInError = error.message;
				this.cd.markForCheck();
			});
	}
}
