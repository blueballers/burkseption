import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddReviewComponent } from "./add-review/add-review.component";

const routes: Routes = [
	{
		path: "addreview",
		component: AddReviewComponent
	},
	{
		path: "",
		component: HomeComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			// enableTracing: true
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
