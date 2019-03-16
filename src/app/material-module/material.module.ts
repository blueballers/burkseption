import { NgModule } from "@angular/core";
import {
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule,
	MatCardModule,
	MatInputModule
} from "@angular/material";

@NgModule({
	exports: [
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatCardModule,
		MatInputModule
	]
})
export class MaterialModule { }
