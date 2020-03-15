import { Component, OnInit } from '@angular/core';

import { User } from './../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/models/app-state.model';

import { RemoveUserAction } from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.user$ = this.store.select(store => store.tasks.user);
  }
  async logOutUser() {
    this.store.dispatch(new RemoveUserAction());
  }
}
