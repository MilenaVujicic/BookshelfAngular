import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-shelf-page',
  templateUrl: './shelf-page.component.html',
  styleUrls: ['./shelf-page.component.css']
})
export class ShelfPageComponent implements OnInit {

  constructor(public _route:Router) { }

  ngOnInit(): void {
  }

}
