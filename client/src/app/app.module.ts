import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { HomeComponent } from './components/home/home.component';

import { TasksComponent } from './components/tasks/tasks.component';
import { NgrxTest1Component } from './components/ngrx-test1/ngrx-test1.component';

import { UsersService } from './services/users.service';
import { TasksService } from './services/tasks.service';

import { TaskFilterPipe } from './pipes/task-filter.pipe';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/reducers/counter.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    TaskFilterPipe,
    NgrxTest1Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [UsersService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
