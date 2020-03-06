import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';

import { UsersService } from './services/users.service';
import { TasksService } from './services/tasks.service';
import { TaskFilterPipe } from './pipes/task-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    TaskFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
  ],
  providers: [UsersService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
