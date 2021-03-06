import { Component, OnInit } from '@angular/core';
import {Publisher} from "../../../models/Publisher";
import {HttpClient} from "@angular/common/http";
import {Author} from "../../../models/Author";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.css']
})
export class PublisherFormComponent implements OnInit {

  publisher:Publisher ={
    id:0,
    name:''
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let publisherID = localStorage.getItem("publisherID");
    let u = localStorage.getItem('username');
    if(publisherID != null){
      let url = "http://localhost:8000/publisher/" + publisherID + "/" + u + "/";
      this.http.get(url).subscribe(
        (res:Author)=>{this.publisher = res;},
        err=>{alert("Something went wrong"); console.log(err.message);}
      );
    }
  }

  sendPublisher():void{
    let u = localStorage.getItem('username');
    let publisherID = localStorage.getItem("publisherID");
    if (publisherID != null) {
      let url = "http://localhost:8000/publisher/" + publisherID + "/" + u + "/";
      this.http.put(url, this.publisher).subscribe(
        res => {
          alert("Publisher edited");
          localStorage.removeItem("publisherID");
          location.reload();
        },
        err => {
          alert("Something went wrong");
          console.log(err.message);
        }
      );
    }else{
      let url = "http://localhost:8000/publisher/" + u + "/";
      this.http.post(url, this.publisher).subscribe(
        res=>{alert("Publisher added!"); location.reload();},
        err=>{alert("Something went wrong"); console.log(err.message);}
      );
    }

  }
}
