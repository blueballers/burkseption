import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { SpinnerService } from "./spinner/spinner-overlay.service";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	currentUser$ = this.afAuth.authState.pipe(
		map(user => user
			? {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				emailVerified: user.emailVerified
			} as User
			: undefined
		)
	);
	isAuthenticated$ = this.currentUser$.pipe(
		map(user => user
			// && user.emailVerified !== false
			? true
			: false)
	);

	constructor(
		private afs: AngularFirestore,
		private afAuth: AngularFireAuth,
		private spinnerService: SpinnerService
	) {
	}

	login(email: string, password: string) {
		this.spinnerService.spin$.next(true);
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.setUserData(result.user);
			}).finally(() => this.spinnerService.spin$.next(false));
	}

	register(email: string, password: string) {
		this.spinnerService.spin$.next(true);
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.setUserData(result.user);
			}).finally(() => this.spinnerService.spin$.next(false));
	}

	// Send email verfificaiton when new user sign up
	SendVerificationMail() {
		return this.afAuth.auth.currentUser.sendEmailVerification()
			.then(() => {
				console.log("EMAIL VERIF SENT");
			});
	}

	// Reset Forggot password
	forgotPassword(passwordResetEmail: string) {
		return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert("Password reset email sent, check your inbox.");
			}).catch((error) => {
				window.alert(error);
			});
	}

	// Sign in with Google
	googleAuth() {
		return this.authLogin(new auth.GoogleAuthProvider());
	}

	// Auth logic to run auth providers
	authLogin(provider) {
		return this.afAuth.auth.signInWithPopup(provider)
			.then((result) => {
				this.setUserData(result.user);
			}).catch((error) => {
				window.alert(error);
			});
	}

	/* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	setUserData(user) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified
		};
		return userRef.set(userData, {
			merge: true
		});
	}

	// Sign out
	logout() {
		return this.afAuth.auth.signOut().then(() => {
			console.log("logged out");
		});
	}

}
