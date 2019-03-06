import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectorRef
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import { Burger } from "../burger/burger.model";
import { tap } from "rxjs/operators";

@Component({
	selector: "burx-add-review",
	templateUrl: "./add-review.component.html",
	styleUrls: ["./add-review.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class AddReviewComponent implements OnInit {
	selectedFile: File;
	burger: Burger = {
		name: "new",
		address: "burger",
		imageUrl: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
	};
	profileForm = new FormGroup({
		oneWordReview: new FormControl("")
	});

	constructor(private httpClient: HttpClient) {}

	ngOnInit() {
		this.profileForm.valueChanges
			.pipe(
				tap(
					formValue =>
						(this.burger = {
							...this.burger,
							name: formValue.oneWordReview
						})
				)
			)
			.subscribe();
	}

	onFileSelected(event) {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			// read file as data url
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event: any) => {
				// called once readAsDataURL is completed
				this.burger = {
					...this.burger,
					imageUrl: event.target.result
				};
			};
		}
	}

	onUpload() {
		console.info("NOT IMPLEMENTED");
		// const formData = new FormData();
		// formData.append("image", this.selectedFile, this.selectedFile.name);
		// this.httpClient
		// 	.post("", formData)
		// 	.subscribe(response => console.log(response));
	}
}
