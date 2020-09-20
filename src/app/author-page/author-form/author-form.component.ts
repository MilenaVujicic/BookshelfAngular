import { Component, OnInit } from '@angular/core';
import {Author} from '../../../models/Author';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {

  author:Author = {
    id:0,
    name:'',
    surname:''
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let authorID = localStorage.getItem("authorID");
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    if(authorID != null){
      let url = "http://localhost:8000/author/" + authorID + "/" + u + "/";
      this.http.get(url).subscribe(
        (res:Author)=>{this.author = res; console.log(this.author.name);},
        err=>{alert("Something went wrong"); console.log(err.message);}
      );
    }

  }

  sendAuthor():void {
    let authorID = localStorage.getItem("authorID");
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    if (authorID != null) {
      let url = "http://localhost:8000/author/" + authorID + "/" + u + "/";
      this.http.put(url, this.author).subscribe(
        res => {
          alert("Author edited");
          localStorage.removeItem("authorID");
          location.reload();
        },
        err => {
          alert("Something went wrong");
          console.log(err.message);
        }
      );
    } else {

      let url = "http://localhost:8000/author/" + u + "/";
      this.http.post(url, this.author).subscribe(
        res => {
          alert("Author added");
          location.reload();
        },
        err => {
          alert("Something went wrong");
        }
      );
    }
  }
}
