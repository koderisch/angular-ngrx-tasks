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
} from '../actions/tasks.actions';
import { of } from 'rxjs';
import { TasksService } from '../../services/tasks.service';

@Injectable()
export class TasksEffects {
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
  /*
  @Effect() assignTask$ = this.actions$.pipe(
    ofType<AssignTaskAction>(TasksActionTypes.ASSIGN_TASK),
    mergeMap(data =>
      this.tasksService.assignTask(data.payload).pipe(
        map(() => new AssignTaskSuccessAction(data.payload)),
        catchError(error => of(new AssignTaskFailureAction(error)))
      )
    )
  );
/*
  @Effect() deleteShoppingItem$ = this.actions$.pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap(data =>
      this.shoppingService.deleteShoppingItem(data.payload).pipe(
        map(() => new DeleteItemSuccessAction(data.payload)),
        catchError(error => of(new DeleteItemFailureAction(error)))
      )
    )
  );
*/
  constructor(private actions$: Actions, private tasksService: TasksService) {}
}
