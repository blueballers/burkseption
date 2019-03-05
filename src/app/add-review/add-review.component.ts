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
		address: "burger"
	};
	profileForm = new FormGroup({
		oneWordReview: new FormControl("")
	});

	constructor(
		private httpClient: HttpClient,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.profileForm.valueChanges.pipe(
			tap(formValue => this.burger = {
				...this.burger,
				name: formValue.oneWordReview
			})
		).subscribe();
	}

	onFileSelected(event) {
		console.log(event);
		this.selectedFile = event.target.files[0] as File;

		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				this.burger = {
					...this.burger,
					name: theFile.name,
					imageUrl: e.target.result
				};
				console.log(this.burger);
			};
		})(this.selectedFile);

		reader.readAsDataURL(this.selectedFile);
		this.cd.markForCheck();
	}

	onUpload() {
		const formData = new FormData();
		formData.append("image", this.selectedFile, this.selectedFile.name);
		this.httpClient
			.post("", formData)
			.subscribe(response => console.log(response));
	}
}
