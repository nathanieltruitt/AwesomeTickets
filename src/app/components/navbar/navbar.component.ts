import { Component, OnInit } from '@angular/core';
import {
  faBuilding,
  faPerson,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBuilding = faBuilding;
  faPerson = faPerson;
  faHeadset = faHeadset;
  changeColor = false;

  constructor() {}

  ngOnInit(): void {}

  changeToWhite() {
    this.changeColor = !this.changeColor;
  }
}
