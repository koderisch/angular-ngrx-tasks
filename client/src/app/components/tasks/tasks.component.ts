import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UsersService } from '../../services/users.service';

import { Task } from '../../models/task.model';
import { AppState } from 'src/app/store/models/app-state.model';

import {
  LoadTasksAction,
  AssignTaskAction,
  UnAssignTaskAction,
} from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  loggedIn: {
    user_name: string;
    user_id: number;
  };
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  tasksUnassigned: Task[];
  tasksAssignedToUser: Task[];
  filterUnassigned = { assigned_user_id: null };

  constructor(
    private store: Store<AppState>,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tasks$ = this.store.select(store => store.tasks.list);
    this.loading$ = this.store.select(store => store.tasks.loading);
    this.error$ = this.store.select(store => store.tasks.error);
    this.store.dispatch(new LoadTasksAction());
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    this.loggedIn = this.usersService.getLoggedIn();
    if (!this.loggedIn) {
      this.router.navigateByUrl('/');
    }
  }
  async logOutUser() {
    this.usersService.logOut();
    this.router.navigateByUrl('/');
  }

  assignTaskToUser(id: number) {
    this.store.dispatch(
      new AssignTaskAction({
        task_id: id,
        assigned_user_id: this.loggedIn.user_id,
      })
    );
  }
  unAssignTaskFromUser(id: number) {
    this.store.dispatch(
      new UnAssignTaskAction({
        task_id: id,
      })
    );
  }
}
