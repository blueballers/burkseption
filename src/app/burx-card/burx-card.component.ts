import { Component, OnInit, Input, Output } from "@angular/core";
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
		document.getElementById("burx-google-map").scrollIntoView();

		this.mapSerivce.addMarker(
			new google.maps.Marker({
				position: { lat: item.lat, lng: item.lng },
				title: item.name,
				animation: google.maps.Animation.DROP
			})
		);
	}
}
