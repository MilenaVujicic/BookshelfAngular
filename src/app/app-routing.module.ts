import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPageComponent} from "./user-page/user-page.component";
import {AuthorFormComponent} from "./author-page/author-form/author-form.component";
import {AuthorPageComponent} from "./author-page/author-page.component";
import {PublisherPageComponent} from "./publisher-page/publisher-page.component";
import {BookPageComponent} from "./book-page/book-page.component";
import {DefaultPageComponent} from "./default-page/default-page.component";
import {LoginPageComponent} from "./default-page/login-page/login-page.component";
import {RegisterPageComponent} from "./default-page/register-page/register-page.component";
import {ShelfPageComponent} from "./shelf-page/shelf-page.component";
import {ReviewPageComponent} from "./review-page/review-page.component";

const routes: Routes = [
  {
    path:'user',
    component:UserPageComponent
  },
  {
    path:'author/add',
    component:AuthorPageComponent
  },
  {
    path:'author/view',
    component:AuthorPageComponent
  },
  {
    path:'publisher/add',
    component:PublisherPageComponent
  },
  {
    path:'publisher/view',
    component:PublisherPageComponent
  },
  {
    path:'shelf/add',
    component:ShelfPageComponent
  },
  {
    path:'shelf/view',
    component:ShelfPageComponent
  },
  {
    path:'book/add',
    component:BookPageComponent
  },
  {
    path:'book/view',
    component:BookPageComponent
  },
  {
    path:'review',
    component:ReviewPageComponent
  },
  {
    path:'log_in',
    component:LoginPageComponent
  },
  {
    path:'sign_in',
    component:RegisterPageComponent
  },
  {
    path:'user/data',
    component:UserPageComponent
  },
  {
    path:'book/all',
    component:BookPageComponent
  },
  {
    path:'book/lent',
    component:BookPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
