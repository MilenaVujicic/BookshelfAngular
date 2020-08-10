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
  }

  sendAuthor():void{
    let url = "http://localhost:8000/author/"
    this.http.post(url,this.author).subscribe(
      res=>{alert("Author added");},
      err=>{alert("Something went wrong");}
    );
  }

}
