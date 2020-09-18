import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { NavBarComponent } from './default-page/nav-bar/nav-bar.component';
import {HttpClientModule} from "@angular/common/http";
import { BookPageComponent } from './book-page/book-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserNavComponent } from './user-page/user-nav/user-nav.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { BookFormComponent } from './book-page/book-form/book-form.component';
import { BookListComponent } from './book-page/book-list/book-list.component';
import { AuthorFormComponent } from './author-page/author-form/author-form.component';
import { AuthorListComponent } from './author-page/author-list/author-list.component';
import { PublisherPageComponent } from './publisher-page/publisher-page.component';
import { PublisherFormComponent } from './publisher-page/publisher-form/publisher-form.component';
import { PublisherListComponent } from './publisher-page/publisher-list/publisher-list.component';
import {FormsModule} from "@angular/forms";
import { LoginPageComponent } from './default-page/login-page/login-page.component';
import { RegisterPageComponent } from './default-page/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    NavBarComponent,
    BookPageComponent,
    UserPageComponent,
    UserNavComponent,
    AuthorPageComponent,
    BookFormComponent,
    BookListComponent,
    AuthorFormComponent,
    AuthorListComponent,
    PublisherPageComponent,
    PublisherFormComponent,
    PublisherListComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
