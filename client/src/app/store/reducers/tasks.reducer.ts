import { Task } from 'src/app/models/task.model';
import { TasksActionTypes, TasksAction } from '../actions/tasks.actions';
import { User } from 'src/app/models/user.model';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

export interface TasksState {
  list: Task[];
  loading: boolean;
  error: Error;
  user: User;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  error: undefined,
  user: undefined,
};

export function TasksReducer(
  state: TasksState = initialState,
  action: TasksAction
) {
  switch (action.type) {
    case TasksActionTypes.LOAD_TASKS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case TasksActionTypes.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    case TasksActionTypes.LOAD_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case TasksActionTypes.ASSIGN_TASK:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case TasksActionTypes.ASSIGN_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.map(item =>
          item.task_id === action.payload.task_id
            ? { ...item, assigned_user_id: action.payload.user_id }
            : item
        ),
        loading: false,
      };
    case TasksActionTypes.ASSIGN_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case TasksActionTypes.UNASSIGN_TASK:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case TasksActionTypes.UNASSIGN_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.map(item =>
          item.task_id === action.payload.task_id
            ? { ...item, assigned_user_id: undefined }
            : item
        ),
        loading: false,
      };
    case TasksActionTypes.UNASSIGN_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case TasksActionTypes.STORE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case TasksActionTypes.REMOVE_USER:
      return {
        ...state,
        user: undefined,
      };

    case TasksActionTypes.ADD_TASK:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case TasksActionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        list: [ ...state.list, action.payload ],
        loading: false,
      };
    case TasksActionTypes.ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
