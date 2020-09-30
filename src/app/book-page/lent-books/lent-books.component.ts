import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lent-books',
  templateUrl: './lent-books.component.html',
  styleUrls: ['./lent-books.component.css']
})
export class LentBooksComponent implements OnInit {

  lentBooks:Book[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/all_lent_books/" + u + '/';
    this.http.get(url).subscribe(
      (res:Book[])=>{this.lentBooks=res;},
      err=>{console.log("Something went wrong"); console.log(err.message);}
    )

  }

  returnBook(id):void{
    let url = "http://localhost:8000/return_book/" + id + "/";
    this.http.put(url, null).subscribe(
      res=>{alert("Book returned"); location.reload();},
      err=>{alert("Something went wrong");console.log(err.message);}
    )
  }

}
