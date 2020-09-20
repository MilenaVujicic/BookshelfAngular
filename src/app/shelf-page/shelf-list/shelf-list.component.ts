import { Component, OnInit } from '@angular/core';
import {Shelf} from "../../../models/Shelf";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.css']
})
export class ShelfListComponent implements OnInit {

  shelves:Shelf[] = [];
  showing:boolean = false;

  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/shelf/" + u + "/";
    this.http.get(url).subscribe(
      (res:Shelf[])=>{this.shelves = res;},
      err=>{alert("Something went wrong!"); console.log(err.message);}
    )
  }

  showBooks(id):void{
    this.showing = true;
  }

  editShelf(id):void{
    localStorage.setItem('shelfID', id);
    location.href="./shelf/add";
  }

  deleteShelf(id):void{
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/shelf/" + id + "/" + u + "/";
    this.http.delete(url).subscribe(
      res=>{alert("Shelf deleted"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

}
