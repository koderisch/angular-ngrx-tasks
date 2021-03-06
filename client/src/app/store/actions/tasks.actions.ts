import { Action } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

export enum TasksActionTypes {
  LOAD_TASKS = '[TASKS] Load Tasks',
  LOAD_TASKS_SUCCESS = '[TASKS] Load Tasks Success',
  LOAD_TASKS_FAILURE = '[TASKS] Load Tasks Failure',
  ASSIGN_TASK = '[TASKS] Assign Task',
  ASSIGN_TASK_SUCCESS = '[TASKS] Assign Task Success',
  ASSIGN_TASK_FAILURE = '[TASKS] Assign Task Failure',
  UNASSIGN_TASK = '[TASKS] UnAssign Task',
  UNASSIGN_TASK_SUCCESS = '[TASKS] UnAssign Task Success',
  UNASSIGN_TASK_FAILURE = '[TASKS] UnAssign Task Failure',
  STORE_USER = '[TASKS] Store User',
  REMOVE_USER = '[TASKS] Remove User',
  ADD_TASK = '[TASKS] Add Task',
  ADD_TASK_SUCCESS = '[TASKS] Add Task Success',
  ADD_TASK_FAILURE = '[TASKS] Add Task Failure',
}

export class LoadTasksAction implements Action {
  readonly type = TasksActionTypes.LOAD_TASKS;
}
export class LoadTasksSuccessAction implements Action {
  readonly type = TasksActionTypes.LOAD_TASKS_SUCCESS;
  constructor(public payload: Array<Task>) {}
}
export class LoadTasksFailureAction implements Action {
  readonly type = TasksActionTypes.LOAD_TASKS_FAILURE;
  constructor(public payload: Error) {}
}

export class AssignTaskAction implements Action {
  readonly type = TasksActionTypes.ASSIGN_TASK;
  constructor(public payload: { task_id: number; user_id: number }) {}
}
export class AssignTaskSuccessAction implements Action {
  readonly type = TasksActionTypes.ASSIGN_TASK_SUCCESS;
  constructor(public payload: { task_id: number; user_id: number }) {}
}
export class AssignTaskFailureAction implements Action {
  readonly type = TasksActionTypes.ASSIGN_TASK_FAILURE;
  constructor(public payload: Error) {}
}

export class UnAssignTaskAction implements Action {
  readonly type = TasksActionTypes.UNASSIGN_TASK;
  constructor(public payload: { task_id: number }) {}
}

export class UnAssignTaskSuccessAction implements Action {
  readonly type = TasksActionTypes.UNASSIGN_TASK_SUCCESS;
  constructor(public payload: { task_id: number }) {}
}
export class UnAssignTaskFailureAction implements Action {
  readonly type = TasksActionTypes.UNASSIGN_TASK_FAILURE;
  constructor(public payload: Error) {}
}

export class StoreUserAction implements Action {
  readonly type = TasksActionTypes.STORE_USER;
  constructor(public payload: User) {}
}
export class RemoveUserAction implements Action {
  readonly type = TasksActionTypes.REMOVE_USER;
  constructor() {}
}

export class AddTaskAction implements Action {
  readonly type = TasksActionTypes.ADD_TASK;
  constructor(public payload: { task_name: string }) {}
}
export class AddTaskSuccessAction implements Action {
  readonly type = TasksActionTypes.ADD_TASK_SUCCESS;
  constructor(public payload: { newTask: Task }) {}
}
export class AddTaskFailureAction implements Action {
  readonly type = TasksActionTypes.ADD_TASK_FAILURE;
  constructor(public payload: Error) {}
}


export type TasksAction =
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailureAction
  | AssignTaskAction
  | AssignTaskSuccessAction
  | AssignTaskFailureAction
  | UnAssignTaskAction
  | UnAssignTaskFailureAction
  | UnAssignTaskSuccessAction
  | StoreUserAction
  | RemoveUserAction
  | AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailureAction;
  

