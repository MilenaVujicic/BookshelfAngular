import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(public _route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('jwt') == null){
      location.href = "./";
    }
  }

}
