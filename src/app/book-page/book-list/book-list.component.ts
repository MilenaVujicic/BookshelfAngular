import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Shelf} from "../../../models/Shelf";
import {Author} from "../../../models/Author";
import {Publisher} from "../../../models/Publisher";
import {Review} from "../../../models/Review";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {

  showing = false;
  reviewing = false;
  showReview = false;
  books:Book[] = [];
  authors:Author[] = [];
  shelves:Shelf[] = [];
  publisher:Publisher = {
    id:0,
    name:''
  }
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

  selectedRating:number = 0;

  review:Review = {
    id:0,
    rating:1,
    content:''
  }

  reviews:Review[] = [];
  reviewer:string = '';

  cover:string = "";
  reviewingId = 0;

  constructor(private http: HttpClient, public _route:Router) { }

  ngOnInit(): void {
    let u = localStorage.getItem('username');
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

    let urla = "http://localhost:8000/book_author/" + this.showBook.id + "/";
    this.http.get(urla).subscribe(
      (res:Author[])=>{this.authors=res;},
      err=>{console.log(err.message);}
    )

    let u = localStorage.getItem('username');
    let urlp = "http://localhost:8000/publisher/" + this.showBook.publisher + "/" + u + "/";
    this.http.get(urlp).subscribe(
      (res:Publisher)=>{this.publisher = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );




    this.cover = "http://localhost:8000/" + this.showBook.cover;
    //console.log(this.cover);
  }

  hideBook():void{
    this.showing = false;
  }

  editBook(id):void{

  }

  deleteBook(id):void{
    let url = "http://localhost:8000/book/" + id + "/";
    this.http.delete(url).subscribe(
      res=>{alert("Book deleted!"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )

  }

  reviewBook(id):void{
    this.reviewing = true;
    this.reviewingId = id;
  }

  sendReview():void{
    this.reviewing = false;
    this.review.rating = this.selectedRating;
    console.log(this.review);
    console.log(this.selectedRating);
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/review/" + u + "/" + this.reviewingId + "/";

    this.http.post(url, this.review).subscribe(
      res=>{alert("Review added!"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

  showReviews(id):void{

    this.showReview=true;
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/review/" + u + "/" + id;
    this.http.get(url).subscribe(
      (res:Review[])=>{this.reviews = res;
      },
      err=>{alert("Something went wrong"); console.log(err.message);}
    )



  }

  hideReview():void{

    this.showReview=false;
  }

}
