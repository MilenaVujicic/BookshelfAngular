import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {

  constructor(private http:HttpClientModule, public _route:Router) { }

  ngOnInit(): void {
  }


}
