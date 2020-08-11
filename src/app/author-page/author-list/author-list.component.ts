import { Component, OnInit } from '@angular/core';
import {Author} from "../../../models/Author";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors:Author[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let url = "http://localhost:8000/author/";
    this.http.get(url).subscribe(
      (res:Author[])=>{console.log("Success"); this.authors=res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

  editAuthor(id):void{
    localStorage.setItem('authorID', id);
    location.href="./author/add";
  }

  deleteAuthor(id):void{
    let url = "http://localhost:8000/author/" + id + "/";
    this.http.delete(url).subscribe(
      res=>{alert("Author successfully deleted"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

}
