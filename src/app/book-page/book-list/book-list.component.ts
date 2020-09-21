import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  showing = false;
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

  cover:string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let jwt = localStorage.getItem('jwt');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(jwt);
    let u = decoded['username'].toString();
    let url = "http://localhost:8000/books/" + u + '/';

    this.http.get(url).subscribe(
      (res:Book[])=>{this.books = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

  displayBook(id):void{
    this.showing = true;
    for(let i = 0; i < this.books.length; i++){
      if(this.books[i].id == id){
        this.showBook = this.books[i];
      }

    }

    this.cover = "http://localhost:8000/" + this.showBook.cover;
    console.log(this.cover);
  }

  hideBook():void{
    this.showing = false;
  }
}
