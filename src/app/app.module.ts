import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HomeComponent,
    TaskEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
