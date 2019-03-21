import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from "@angular/core";
import { MapsService } from "./google-maps.service";
import { tap, map } from "rxjs/operators";
import { Burger } from "../burger/burger.model";
import { BurgerService } from "../burger/burger.service";
import { Subscription, merge } from "rxjs";

export interface GLocation {
	title: string;
	latitude: number;
	longitude: number;
	distance?: number;
}

@Component({
	selector: "burx-google-maps",
	templateUrl: "./google-maps.component.html",
	styleUrls: ["./google-maps.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class GoogleMapsComponent implements OnInit, OnDestroy {
	@ViewChild("gmap") gmapElement: any;
	map: google.maps.Map;
	currentLat: any;
	currentLong: any;
	marker: google.maps.Marker;
	burgersFilteredByDistance: GLocation[];
	directionsWithWazeUrl: string;

	private burgers: Burger[];
	private data$$: Subscription;

	constructor(
		private mapService: MapsService,
		private burgerService: BurgerService
	) {
	}

	ngOnInit() {
		const mapProp = {
			center: new google.maps.LatLng(59.4336547, 24.745017),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		const burgers$ = this.burgerService.getBurgers().pipe(map(burgers => this.burgers = burgers));
		const markers$ = this.mapService.markers$
			.pipe(
				tap(marker => {
					marker.setMap(this.map);
					this.map.panTo(marker.getPosition());
				})
			);

		this.data$$ = merge(
			markers$,
			burgers$
		).subscribe();
	}

	ngOnDestroy() {
		if (this.data$$) {
			this.data$$.unsubscribe();
		}
	}

	findMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.showPosition(position);

				this.burgersFilteredByDistance = this.applyHaversine(
					this.burgers.map(burger => ({
						title: burger.name,
						latitude: burger.lat,
						longitude: burger.long
					})),
					position
				);

				this.burgersFilteredByDistance.sort((locationA, locationB) => {
					return locationA.distance - locationB.distance;
				});

				// https://developers.google.com/waze/deeplinks/
				this.directionsWithWazeUrl = `https://www.waze.com/ul?ll=${
					this.burgersFilteredByDistance[0].latitude
					},${
					this.burgersFilteredByDistance[0].longitude
					}&navigate=yes&zoom=17`;
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	applyHaversine(locations, userLoc: Position) {
		const usersLocation = {
			lat: userLoc.coords.latitude,
			lng: userLoc.coords.longitude
		};

		locations.map(location => {
			const placeLocation = {
				lat: location.latitude,
				lng: location.longitude
			};

			location.distance = this.getDistanceBetweenPoints(
				usersLocation,
				placeLocation
			).toFixed(2);
		});

		return locations;
	}

	getDistanceBetweenPoints(start, end) {
		const R = 6371; // earthRadius in KM
		const lat1 = start.lat;
		const lon1 = start.lng;
		const lat2 = end.lat;
		const lon2 = end.lng;

		const dLat = this.toRad(lat2 - lat1);
		const dLon = this.toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.toRad(lat1)) *
			Math.cos(this.toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c;

		return d;
	}

	toRad(x) {
		return (x * Math.PI) / 180;
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
