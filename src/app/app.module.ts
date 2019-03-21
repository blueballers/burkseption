import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { environment } from "src/environments/environment";

// Material
import { MaterialModule } from "./material-module/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { SideNavigationContainer } from "./navigation/side-navigation/side-navigation.container";
import { BurxListComponent } from "./burx-list/burx-list.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { HttpClientModule } from "@angular/common/http";
import { BurxCardComponent } from "./burx-card/burx-card.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		BurxListComponent,
		GoogleMapsComponent,
		AddReviewComponent,
		BurxCardComponent,
		SideNavigationContainer
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		MaterialModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
