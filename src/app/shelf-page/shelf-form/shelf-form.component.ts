import { Component, OnInit } from '@angular/core';
import {Shelf} from "../../../models/Shelf";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shelf-form',
  templateUrl: './shelf-form.component.html',
  styleUrls: ['./shelf-form.component.css']
})
export class ShelfFormComponent implements OnInit {

  shelf:Shelf ={
    id: 0,
    name:'',
    description:''

  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let shelfID = localStorage.getItem("shelfID");
    let u = localStorage.getItem('username');

    if(shelfID != null){
      let url = "http://localhost:8000/shelf/" + shelfID + "/" + u + "/";
      this.http.get(url).subscribe(
        (res:Shelf)=>{
          this.shelf = res;
        },
        err=>{alert("Something went wrong"); console.log(err.message);}
      )
    }

  }

  sendShelf(){
    let shelfID = localStorage.getItem("shelfID");
    let u = localStorage.getItem('username');

    if(shelfID != null){
      let url = "http://localhost:8000/shelf/" + shelfID + "/" + u + "/";
      this.http.put(url, this.shelf).subscribe(
        res=>{
          alert("Shelf edited");
          localStorage.removeItem("shelfID");
          location.reload();
        },
        err=>{
          alert("Something went wrong");
          console.log(err.message);
        }
      );
    }else{
      let url = "http://localhost:8000/shelf/" + u + "/";
      this.http.post(url, this.shelf).subscribe(
        res=>{alert("Shelf added"); location.reload();},
        err=>{alert("Something went wrong"); console.log(err.message);}
      )
    }
  }

}
