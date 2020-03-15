import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';

import { UsersService } from './services/users.service';
import { TasksService } from './services/tasks.service';

import { TaskFilterPipe } from './pipes/task-filter.pipe';

import { StoreModule } from '@ngrx/store';
import { TasksReducer } from './store/reducers/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, TasksComponent, TaskFilterPipe, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ tasks: TasksReducer }),
    EffectsModule.forRoot([TasksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [UsersService, TasksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
