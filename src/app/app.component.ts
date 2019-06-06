import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBkJ7Rncne0trDzSW55JB-04Z8bXWu5egQ",
      authDomain: "my-app-b2f59.firebaseapp.com"
    });
  }
}
