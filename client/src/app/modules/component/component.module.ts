import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/account/login/login.component';
import { RegisterComponent } from 'src/app/components/account/register/register.component';
import { AddHallComponent } from 'src/app/components/add-hall/add-hall.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NoAccessComponent } from 'src/app/components/no-access/no-access.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { SearchHallComponent } from 'src/app/components/search-hall/search-hall.component';
import { UserAccountComponent } from 'src/app/components/user-account/user-account.component';
import { WeddingAdviceComponent } from 'src/app/components/wedding-advice/wedding-advice.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

const components = [ //variable
  AddHallComponent,
  HomeComponent,
  NavbarComponent,
  SearchHallComponent,
  NotFoundComponent,
  WeddingAdviceComponent,
  UserAccountComponent,
  FooterComponent,
  CommentComponent,
  NoAccessComponent,
  LoginComponent,
  RegisterComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    // CRUD
    HttpClientModule,

    // form
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [components]
})
export class ComponentModule { }
