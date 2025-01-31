import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateprojectComponent } from './components/createproject/createproject.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateprojectComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing, 
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    appRoutingProviders
  ]
})
export class AppModule { }
