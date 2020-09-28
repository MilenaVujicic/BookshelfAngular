import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUser} from "../../../models/AppUser";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  appUser:AppUser = {
    id:0,
    username:'',
    password:'',
    first_name:'',
    last_name:'',
    email:''
  }


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  sendUser():void{
      let username = this.appUser.username;
      let password = this.appUser.password;
      let body = JSON.stringify({username, password});
      this.http.post("http://localhost:8000/user/login/", body).subscribe(
        (res:AppUser)=> {
          localStorage.setItem('username', res.username);
          location.href = "./user"
        },
        err=>{
          alert("Something went wrong");
          console.log(err.message);})

  }
}
