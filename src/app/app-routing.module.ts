import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPageComponent} from "./user-page/user-page.component";
import {AuthorFormComponent} from "./author-page/author-form/author-form.component";
import {AuthorPageComponent} from "./author-page/author-page.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
