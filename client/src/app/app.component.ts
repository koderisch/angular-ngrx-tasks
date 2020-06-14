import { Component, OnInit } from '@angular/core';

import { User } from './models/user.model';
import { UsersService } from './services/users.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/models/app-state.model';
import { StoreUserAction } from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    const user = this.usersService.getUserFromLocalStorage();
    if (user) {
      this.store.dispatch(new StoreUserAction(user));
    }
  }
}
