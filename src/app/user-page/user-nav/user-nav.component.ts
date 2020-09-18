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
    let jwt = localStorage.getItem('jwt');
    if(jwt != null){
      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(jwt);
      this.user = decoded['username'].toString();
    }
  }


  logout():void{
    localStorage.removeItem('jwt');
    location.href="./";
  }

}
