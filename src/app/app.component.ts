import { Component } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// FIREBASE
import { AngularFirestore } from '@angular/fire/firestore';
import { Burger } from './burger/burger.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'burkseption';

  items: Observable<Burger[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection<Burger>('items').valueChanges();
  }

}