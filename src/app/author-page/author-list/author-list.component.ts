import { Component, OnInit } from '@angular/core';
import {Author} from "../../../models/Author";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors:Author[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/author/" + u + "/";
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
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/author/" + id + "/" + u + "/";
    console.log(url);
    this.http.delete(url).subscribe(
      res=>{alert("Author deleted"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

}
