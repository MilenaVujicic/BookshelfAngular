import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {

  logged:boolean = false;

  constructor(private http:HttpClient, public _router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('jwt') != null)
      this.logged = true;
  }

  sendRequest():void{

  }
}
