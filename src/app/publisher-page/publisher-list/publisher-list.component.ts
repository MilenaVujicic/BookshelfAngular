import { Component, OnInit } from '@angular/core';
import {Publisher} from "../../../models/Publisher";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publishers:Publisher[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let url = "http://localhost:8000/publisher";
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
    let url = "http://localhost:8000/publisher/" + id + "/";
    this.http.delete(url).subscribe(
      res=>{alert("Publisher deleted"); location.reload();},
      err=>{alert("Something went wrong"); console.log(err.message);}
    );
  }


}
