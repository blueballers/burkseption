import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from "src/environments/environment";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { SideNavigationContainer } from "./navigation/side-navigation/side-navigation.container";
import { BurxListComponent } from "./burx-list/burx-list.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { HttpClientModule } from "@angular/common/http";
import { BurxCardComponent } from "./burx-card/burx-card.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginDialog } from "./dialogs/login.dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule, MatSpinner } from "@angular/material/progress-spinner";
import { OverlayModule, FullscreenOverlayContainer, OverlayContainer } from "@angular/cdk/overlay";

const MATERIAL_MODULES = [
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatCardModule,
	MatInputModule,
	MatDialogModule,
	MatProgressSpinnerModule,
	OverlayModule
];

const FIREBASE_MODULES = [
	AngularFirestoreModule,
	AngularFireAuthModule
];
@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		BurxListComponent,
		GoogleMapsComponent,
		AddReviewComponent,
		BurxCardComponent,
		SideNavigationContainer,
		LoginDialog
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		...MATERIAL_MODULES,
		...FIREBASE_MODULES
	],
	providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
	entryComponents: [
		LoginDialog,
		MatSpinner
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
