import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class MapsService {
	markers$ = new Subject<google.maps.Marker>();

	constructor() { }

	addMarker(marker: google.maps.Marker) {
		console.log(marker);
		this.markers$.next(marker);
	}
}
