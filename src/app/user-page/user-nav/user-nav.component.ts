import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  user:string = "";
  constructor() { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if(username != null){
      this.user = username;
    }
  }


  logout():void{
    localStorage.removeItem('username');
    location.href="./";
  }

}
