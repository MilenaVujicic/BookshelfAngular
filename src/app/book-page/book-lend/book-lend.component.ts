import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../../models/Book";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Author} from "../../../models/Author";
import {Publisher} from "../../../models/Publisher";
import {Review} from "../../../models/Review";

@Component({
  selector: 'app-book-lend',
  templateUrl: './book-lend.component.html',
  styleUrls: ['./book-lend.component.css']
})
export class BookLendComponent implements OnInit {

  constructor(private http:HttpClient) { }
  showing = false;
  reviewing = false;
  showReview = false;
  reviewingId:number = 0;
  allBooks:Book[] = [];
  authors:Author[] = [];
  reviews:Review[] = [];
  cover:string = "";

  selectedRating:number = 0;

  review:Review = {
    id:0,
    rating:1,
    content:''
  }

  bookRating:number;
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

  ngOnInit(): void {
    let url = "http://localhost:8000/books/";
    this.http.get(url).subscribe(
      (res:Book[])=>{
        for(let i = 0; i < res.length; i++){
          let uid = localStorage.getItem('userId');
          if(res[i].owner != parseInt(uid)){
            this.allBooks.push(res[i]);
          }
        }},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }


  displayBook(id):void{
    this.showing = true;
    for(let i = 0; i < this.allBooks.length; i++){
      if(this.allBooks[i].id == id){
        this.showBook = this.allBooks[i];
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

    let urlr = "http://localhost:8000/book_rating/" + id + "/";

    this.http.get(urlr).subscribe(
      (res:number)=>{this.bookRating=res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )
  }

  lendBook(id):void{
    let u = localStorage.getItem('username');

    let url = "http://localhost:8000/book_lend/" + id + "/" + u + "/";

    this.http.put(url, null).subscribe(
      res=>{alert("Book lent"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    )

  }

  reviewBook(id):void{
    this.reviewingId = id;
    this.reviewing = true;
  }

  hideBook():void{
    this.showing = false;
  }

  showReviews(id):void{
    this.showReview = true;
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

}
