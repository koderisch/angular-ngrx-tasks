import { Component, OnInit } from '@angular/core';

import { User, Credentials } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/models/app-state.model';
import {
  StoreUserAction,
  RemoveUserAction,
} from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: User[];
  credentials = new Credentials();
  user$: Observable<User>;
  error: string;

  constructor(
    private store: Store<AppState>,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.user$ = this.store.select(store => store.tasks.user);
  }
  getUsers(): void {
    this.usersService.getAll().subscribe(users => (this.users = users));
  }
  async logOutUser() {
    this.store.dispatch(new RemoveUserAction());
  }
  logInUser() {
    this.usersService.logIn(this.credentials).subscribe(user => {
      this.logInSuccess(user);
    });
  }

  showError(err:string) {
    this.error = err;
  }

  async logInSuccess(user) {
    if (user && user.error) {
      this.showError(user.error);
    } else {
      this.store.dispatch(new StoreUserAction(user));
      this.router.navigateByUrl('/tasks');
    }
  }
}
