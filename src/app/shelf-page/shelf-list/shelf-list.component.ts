import { Component, OnInit } from '@angular/core';
import {Shelf} from "../../../models/Shelf";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Book} from "../../../models/Book";
import {Publisher} from "../../../models/Publisher";
import {Author} from "../../../models/Author";

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.css']
})
export class ShelfListComponent implements OnInit {

  shelves:Shelf[] = [];
  showing:boolean = false;
  displaying:boolean = false;
  books:Book[] = [];
  showBook:Book = {
    id:0,
    title:'',
    description:'',
    pages:0,
    isbn:'',
    read:false,
    lent:false,
    cover:'',
    private:false

  }
  publisher:Publisher = {
    id:0,
    name:''
  }
  authors:Author[] = [];
  cover:string = "";


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
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/shelf_book/" + u + "/" + id + "/";
    this.http.get(url).subscribe(
      (res:Book[])=>{this.books = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )

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

  displayBook(id):void{
    this.displaying = true;
    this.showing = false;

    for(let i = 0; i < this.books.length; i++){
      if(this.books[i].id == id){
        this.showBook = this.books[i];
      }

    }

    let urla = "http://localhost:8000/book_author/" + this.showBook.id + "/";
    this.http.get(urla).subscribe(
      (res:Author[])=>{this.authors=res;},
      err=>{console.log(err.message);}
    )

    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let urlp = "http://localhost:8000/publisher/" + this.showBook.publisher + "/" + u + "/";
    this.http.get(urlp).subscribe(
      (res:Publisher)=>{this.publisher = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );





    this.cover = "http://localhost:8000/" + this.showBook.cover;

  }

  hideBook():void{
    this.showing = true;
    this.displaying = false;

  }
}
