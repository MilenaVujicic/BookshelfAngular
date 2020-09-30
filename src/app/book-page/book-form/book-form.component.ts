import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Author} from "../../../models/Author";
import {Shelf} from "../../../models/Shelf";
import {Publisher} from "../../../models/Publisher";
import {forkJoin, Observable} from "rxjs";
import {concatMap} from "rxjs/operators";

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

    if(localStorage.getItem('bookId') != null){
      let bookurl = "http://localhost:8000/book/" + localStorage.getItem('bookId') + "/";
      this.http.get(bookurl).subscribe(
        (res:Book)=>{this.book=res;
          let u = localStorage.getItem('username');
          let urla = "http://localhost:8000/book_author/" + this.book.id + "/";
          let urls = "http://localhost:8000/book_shelf/" + this.book.id + "/";
          let urlp = "http://localhost:8000/publisher/" + this.book.publisher + "/" +
            u + "/";
          let authorReq = this.http.get(urla);
          let shelfReq = this.http.get(urls);
          let pubReq = this.http.get(urlp);

          forkJoin(authorReq, shelfReq, pubReq).subscribe(
            res=>{
              let a = res[0] as Author[];
              for(let i = 0; i < a.length; i++){
                this.selectedAuthors.push(a[i]);
              }
              let s = res[1] as Shelf[];
              for(let i = 0; i < s.length;i++){
                this.selectedShelves.push(s[i]);
              }
              let p = res[2] as Publisher;
              this.selectedPublisher = p;

            }
          )
        },
        err =>{alert("Something went wrong"); console.log(err.message);}
      );
    }

  }

  sendBook():void{
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/book/" + u + "/" + this.selectedPublisher + "/";

    console.log("Publisher " + this.selectedPublisher);

    if(localStorage.getItem('bookId')==null){
      this.http.post(url, this.book).subscribe(
        (res:Book)=>{
          console.log(this.book=res);
          let urla = "http://localhost:8000/book_author/" + this.book.id + "/";

          let urls = "http://localhost:8000/book_shelf/" + this.book.id + "/";

          let authorRequest = this.http.post(urla, this.selectedAuthors);
          let publisherRequest = this.http.post(urls, this.selectedShelves);

          forkJoin(authorRequest, publisherRequest).subscribe(
            res=>{ alert("Add book "); location.reload();}
          )

        },
        err=>{alert("Something went wrong"); console.log(err.message);}
      )
    }else {
      this.http.put(url, this.book).subscribe(
        (res:Book)=>{
          let urla = "http://localhost:8000/book_author/" + res.id + "/";

          let urls = "http://localhost:8000/book_shelf/" + res.id + "/";

          let authorRequest = this.http.put(urla, this.selectedAuthors);
          let publisherRequest = this.http.put(urls, this.selectedShelves);

          forkJoin(authorRequest, publisherRequest).subscribe(
            res=>{alert("Book edited"); localStorage.removeItem('bookId'); location.reload();}
          ); },
        err=>{console.log(err.message); alert("Something went wrong");}
      )
    }




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
