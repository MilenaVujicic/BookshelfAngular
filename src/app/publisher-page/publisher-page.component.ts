import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher-page.component.html',
  styleUrls: ['./publisher-page.component.css']
})
export class PublisherPageComponent implements OnInit {

  constructor(public _route:Router) { }

  ngOnInit(): void {
  }

}
