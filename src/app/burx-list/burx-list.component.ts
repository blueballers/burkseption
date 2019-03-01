import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// RXJS
import { Observable } from 'rxjs';

// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { Burger } from '../burger/burger.model';
import { MapsService } from '../google-maps/google-maps.service';

@Component({
	selector: 'app-burx-list',
	templateUrl: './burx-list.component.html',
	styleUrls: ['./burx-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BurxListComponent implements OnInit {
	burgers: Observable<Burger[]>;

	constructor(db: AngularFirestore, private mapSerivce: MapsService) {
		this.burgers = db.collection<Burger>('items').valueChanges();
	}

	ngOnInit() {}

	showOnMap(item: Burger) {
		this.mapSerivce.addMarker(
			new google.maps.Marker({
				position: new google.maps.LatLng(-25.363882, 131.044922),
				title: 'Hello World!'
			})
		);
	}
}
