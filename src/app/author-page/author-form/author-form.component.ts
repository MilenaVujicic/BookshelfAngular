import { Component, OnInit } from '@angular/core';
import {Author} from '../../../models/Author';
import {HttpClient, HttpClientModule} from "@angular/common/http";

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

    if(authorID != null){
      let url = "http://localhost:8000/author/" + authorID + "/";
      this.http.get(url).subscribe(
        (res:Author)=>{this.author = res; console.log(this.author.name);},
        err=>{alert("Something went wrong"); console.log(err.message);}
      );
    }
  }

  sendAuthor():void {
    let authorID = localStorage.getItem("authorID");
    if (authorID != null) {
      let url = "http://localhost:8000/author/" + authorID + "/";
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

      let url = "http://localhost:8000/author/"
      this.http.post(url, this.author).subscribe(
        res => {
          alert("Author added");
        },
        err => {
          alert("Something went wrong");
        }
      );
    }
  }
}