import { Component, OnInit, Input } from "@angular/core";
import { Burger } from "../burger/burger.model";
import { MapsService } from "../google-maps/google-maps.service";

@Component({
	selector: "burx-burx-card",
	templateUrl: "./burx-card.component.html",
	styleUrls: ["./burx-card.component.scss"]
})
export class BurxCardComponent implements OnInit {
	@Input() burger: Burger;

	constructor(private mapSerivce: MapsService) {}

	ngOnInit() {}

	showOnMap(item: Burger) {
		this.mapSerivce.addMarker(
			new google.maps.Marker({
				position: new google.maps.LatLng(-25.363882, 131.044922),
				title: "Hello World!"
			})
		);
	}
}
