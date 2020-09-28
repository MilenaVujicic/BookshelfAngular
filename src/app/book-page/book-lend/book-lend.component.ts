import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../../models/Book";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-book-lend',
  templateUrl: './book-lend.component.html',
  styleUrls: ['./book-lend.component.css']
})
export class BookLendComponent implements OnInit {

  constructor(private http:HttpClient) { }

  allBooks:Book[] = [];

  ngOnInit(): void {
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/books/";
    this.http.get(url).subscribe(
      (res:Book[])=>{this.allBooks=res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }


  displayBook(id):void{

  }

  lendBook(id):void{

  }

  reviewBook(id):void{

  }
}
