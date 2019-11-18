import {
	Component,
	OnInit,
	ViewChild,
	ViewEncapsulation,
	OnDestroy
} from "@angular/core";
import { MapsService } from "./google-maps.service";
import { tap, map } from "rxjs/operators";
import { Burger } from "../burger/burger.model";
import { BurgerService } from "../burger/burger.service";
import { Subscription, merge } from "rxjs";

export interface LocationWithDistance extends google.maps.LatLngLiteral {
	name: string;
	distance?: number;
}

@Component({
	selector: "burx-google-maps",
	templateUrl: "./google-maps.component.html",
	styleUrls: ["./google-maps.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class GoogleMapsComponent implements OnInit, OnDestroy {
	@ViewChild("gmap", { static: true }) gmapElement: any;

	initialMapCenter: google.maps.LatLngLiteral = {
		lat: 59.4336547,
		lng: 24.745017
	};
	currentPosition: google.maps.LatLngLiteral | undefined;
	currentPositionMarker: google.maps.Marker;

	googleMap: google.maps.Map;
	burgersFilteredByDistance: LocationWithDistance[];
	directionsWithWazeUrl: string;

	private burgers: Burger[];
	private data$$: Subscription;

	constructor(
		private mapService: MapsService,
		private burgerService: BurgerService
	) {}

	ngOnInit() {
		this.googleMap = new google.maps.Map(this.gmapElement.nativeElement, {
			center: this.initialMapCenter,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		const burgers$ = this.burgerService.burgers$.pipe(
			map(burgers => this.burgers = burgers)
		);
		const markers$ = this.mapService.markers$.pipe(
			tap(marker => {
				marker.setMap(this.googleMap);
				this.googleMap.panTo(marker.getPosition());
			})
		);

		this.data$$ = merge(markers$, burgers$).subscribe();
	}

	ngOnDestroy() {
		if (this.data$$) {
			this.data$$.unsubscribe();
		}
	}

	findMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position: Position) => {
				this.currentPosition = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				this.showPosition(this.currentPosition);

				this.burgersFilteredByDistance = this.calculateDistancesFromPoint(
					this.burgers.map(burger => ({
						name: burger.name,
						lat: burger.lat,
						lng: burger.lng
					})),
					this.currentPosition
				);

				this.burgersFilteredByDistance.sort(
					(locationA, locationB) =>
						locationA.distance - locationB.distance
				);

				// https://developers.google.com/waze/deeplinks/
				this.directionsWithWazeUrl = `https://www.waze.com/ul?ll=${
					this.burgersFilteredByDistance[0].lat
				},${
					this.burgersFilteredByDistance[0].lng
				}&navigate=yes&zoom=17`;
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	private calculateDistancesFromPoint(
		locations: LocationWithDistance[],
		userLoc: google.maps.LatLngLiteral
	) {
		locations.map(location => {
			const placeLocation = {
				lat: location.lat,
				lng: location.lng
			};

			location.distance = +this.getDistanceBetweenPoints(
				userLoc,
				placeLocation
			).toFixed(2);
		});

		return locations;
	}

	private getDistanceBetweenPoints(
		start: google.maps.LatLngLiteral,
		end: google.maps.LatLngLiteral
	) {
		const toRad = deg => (deg * Math.PI) / 180;
		const R = 6371; // earthRadius in KM
		const lat1 = start.lat;
		const lon1 = start.lng;
		const lat2 = end.lat;
		const lon2 = end.lng;

		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	}

	private showPosition(position: google.maps.LatLngLiteral) {
		this.googleMap.panTo(position);

		if (!this.currentPositionMarker) {
			this.currentPositionMarker = new google.maps.Marker({
				position,
				map: this.googleMap,
				title: "Here you are!",
				animation: google.maps.Animation.DROP
			});
		} else {
			this.currentPositionMarker.setPosition(position);
		}
	}
}
