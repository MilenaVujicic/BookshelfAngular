import { Component, OnInit } from '@angular/core';
import {Publisher} from "../../../models/Publisher";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publishers:Publisher[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/publisher/" + u + "/";
    this.http.get(url).subscribe(
      (res:Publisher[])=>{this.publishers = res;},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );
  }

  editPublisher(id):void{
      localStorage.setItem("publisherID", id);
      location.href = "./publisher/add";
  }

  deletePublisher(id):void{
    let u = localStorage.getItem('username');
    let url = "http://localhost:8000/publisher/" + id + "/" + u + "/";
    this.http.delete(url).subscribe(
      res=>{alert("Publisher deleted"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );
  }


}
