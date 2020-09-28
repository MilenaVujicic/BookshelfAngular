import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/AppUser";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userModel:AppUser = {
    username:"",
    first_name:"",
    last_name:"",
    email:"",
  };

  editing:Boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let u = localStorage.getItem('username');
    this.http.get("http://localhost:8000/user/" + u + "/").subscribe(
      (res:AppUser) =>{
        this.userModel = res;
      },
      err=>{alert('Something went wrong'); console.log(err.message);}
    )
  }

  editUser():void{
    this.editing = true;
  }

  sendNew():void{
    let u = localStorage.getItem('username');

    this.http.put("http://localhost:8000/user/" + u + "/", this.userModel).subscribe(
      res=>{alert("User edited"); this.editing = false;}

    ),
      err=>{alert("Something went wrong"); console.log(err.message);}

  }

}
