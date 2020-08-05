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

@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    NavBarComponent,
    BookPageComponent,
    UserPageComponent,
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
