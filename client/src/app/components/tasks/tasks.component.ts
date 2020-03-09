import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/models/app-state.model';

import { UsersService } from '../../services/users.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

import {
  LoadTasksAction,
  AssignTaskAction,
  UnAssignTaskAction,
  RemoveUserAction,
} from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  user$: Observable<User>;
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  userId: number;
  tasksUnassigned: Task[];
  tasksAssignedToUser: Task[];
  filterUnassigned = { assigned_user_id: undefined };

  constructor(
    private store: Store<AppState>,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tasks$ = this.store.select(store => store.tasks.list);
    this.loading$ = this.store.select(store => store.tasks.loading);
    this.error$ = this.store.select(store => store.tasks.error);
    this.user$ = this.store.select(store => store.tasks.user);
    this.user$.subscribe(user => this.updateUser(user));
    this.store.dispatch(new LoadTasksAction());
  }

  updateUser(user:User) {
    if (!user) {
      this.router.navigateByUrl('/');
    } else {
      this.userId = user.user_id;
    }
  }
  async logOutUser() {
    this.store.dispatch(new RemoveUserAction());
  }

  assignTaskToUser(id: number) {
    this.store.dispatch(
      new AssignTaskAction({
        task_id: id,
        user_id: this.userId
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
