import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Author} from "../../../models/Author";
import {Shelf} from "../../../models/Shelf";
import {Publisher} from "../../../models/Publisher";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  book:Book = {
    id:0,
    title:'',
    pages:1,
    description:'',
    isbn:'',
    read:false,
    lent: false,
    cover:null,
    private:false
  }

  authors:Author[] = [];
  shelves:Shelf[] = [];
  publishers:Publisher[] = [];

  selectedAuthors:Author[] = [];
  selectedPublisher:Publisher = {
    id:0,
    name:''
  }
  selectedShelves:Shelf[] = [];

  finishedPublisher = false;
  finishedAuthor = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let u = localStorage.getItem('username');
    let authorUrl = "http://localhost:8000/author/" + u + "/";
    let publisherUrl = "http://localhost:8000/publisher/" + u + "/";
    let shelfUrl = "http://localhost:8000/shelf/" + u + "/";

    this.http.get(authorUrl).subscribe(
      (res:Author[])=>{this.authors = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );
    this.http.get(publisherUrl).subscribe(
      (res:Publisher[])=>{this.publishers = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );
    this.http.get(shelfUrl).subscribe(
      (res:Shelf[])=>{this.shelves = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )

  }

  sendBook():void{
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/book/" + u + "/" + this.selectedPublisher + "/";

/*
    this.http.post(urla,this.selectedAuthors).subscribe(
      res=>{console.log("done");},
      err=>{console.log(err.message);}
    );*/
    this.http.post(url, this.book).subscribe(
      (res:Book)=>{
        alert("Add book base"); console.log(this.book=res);
        let urla = "http://localhost:8000/book_author/" + this.book.id + "/";
        this.http.post(urla, this.selectedAuthors).subscribe(
          res=>{alert("Added authors");},
          err=>{alert("Something went wrong");}
        );
        let urls = "http://localhost:8000/book_shelf/" + this.book.id + "/";
        this.http.post(urls, this.selectedShelves).subscribe(
          res=>{alert("Added shelves");},
          err=>{alert("Something went wrong");}
        );
        },
      err=>{alert("Something went wrong"); console.log(err.message);}
    );



  }

  imgChange(event):void{
    if(event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event)=>{
        this.book.cover = event.target.result;
      }
    }
  }

}
