import { Component, OnInit } from '@angular/core';
import {AppUser} from '../../../models/AppUser'
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  userModel:AppUser = {
    username:"",
    first_name:"",
    last_name:"",
    email:"",
    password:""
  };

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  sendUser():void{
    this.http.post("http://localhost:8000/user/", this.userModel).subscribe(
      res=>{alert("Successfully registered!"); location.href = "/"},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }


}
