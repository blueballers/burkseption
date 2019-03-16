import { Component, OnInit, ViewChild } from "@angular/core";
import { MapsService } from "./google-maps.service";
import { tap } from "rxjs/operators";

@Component({
	// tslint:disable-next-line:component-selector
	selector: "burx-google-maps",
	templateUrl: "./google-maps.component.html",
	styleUrls: ["./google-maps.component.scss"]
})
export class GoogleMapsComponent implements OnInit {
	@ViewChild("gmap") gmapElement: any;
	map: google.maps.Map;
	currentLat: any;
	currentLong: any;
	marker: google.maps.Marker;

	constructor(private mapService: MapsService) { }

	ngOnInit() {
		const mapProp = {
			center: new google.maps.LatLng(59.4336547, 24.745017),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		this.mapService.markers$
			.pipe(
				tap(marker => {
					console.log("IM HERE");
					marker.setMap(this.map);
					this.map.panTo(marker.getPosition());
				})
			)
			.subscribe();
	}

	findMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.showPosition(position);
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	private showPosition(position) {
		this.currentLat = position.coords.latitude;
		this.currentLong = position.coords.longitude;

		const location = new google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
		);
		this.map.panTo(location);

		if (!this.marker) {
			this.marker = new google.maps.Marker({
				position: location,
				map: this.map,
				title: "Got you!"
			});
		} else {
			this.marker.setPosition(location);
		}
	}
}
