import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  TasksActionTypes,
  LoadTasksAction,
  LoadTasksSuccessAction,
  LoadTasksFailureAction,
  AssignTaskAction,
  AssignTaskSuccessAction,
  AssignTaskFailureAction,
  UnAssignTaskAction,
  UnAssignTaskFailureAction,
  UnAssignTaskSuccessAction,
  StoreUserAction,
  RemoveUserAction,
  AddTaskAction,
  AddTaskSuccessAction,
  AddTaskFailureAction,
} from '../actions/tasks.actions';
import { of } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { UsersService } from '../../services/users.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private usersService: UsersService
  ) {}

  @Effect() loadTasks$ = this.actions$.pipe(
    ofType<LoadTasksAction>(TasksActionTypes.LOAD_TASKS),
    mergeMap(() =>
      this.tasksService.getTasks().pipe(
        map(data => {
          return new LoadTasksSuccessAction(data);
        }),
        catchError(error => of(new LoadTasksFailureAction(error)))
      )
    )
  );

  @Effect() assignTask$ = this.actions$.pipe(
    ofType<AssignTaskAction>(TasksActionTypes.ASSIGN_TASK),
    mergeMap(data =>
      this.tasksService.assignTask(data.payload).pipe(
        map(() => new AssignTaskSuccessAction(data.payload)),
        catchError(error => of(new AssignTaskFailureAction(error)))
      )
    )
  );

  @Effect() unAssignTask$ = this.actions$.pipe(
    ofType<UnAssignTaskAction>(TasksActionTypes.UNASSIGN_TASK),
    mergeMap(data =>
      this.tasksService.unAssignTask(data.payload).pipe(
        map(() => new UnAssignTaskSuccessAction(data.payload)),
        catchError(error => of(new UnAssignTaskFailureAction(error)))
      )
    )
  );

  @Effect() addTask$ = this.actions$.pipe(
    ofType<AddTaskAction>(TasksActionTypes.ADD_TASK),
    mergeMap(data =>
      this.tasksService.addTask(data.payload).pipe(
        map((newTask: any) => new AddTaskSuccessAction(newTask)),
        catchError(error => of(new AddTaskFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false }) storeUser$ = this.actions$.pipe(
    ofType<StoreUserAction>(TasksActionTypes.STORE_USER),
    map((data) => this.usersService.storeUserInLocalStorage(data.payload))
  );

  @Effect({ dispatch: false }) removeUser$ = this.actions$.pipe(
    ofType<RemoveUserAction>(TasksActionTypes.REMOVE_USER),
    map(() => this.usersService.removeUserFromLocalStorage())
  );

}
