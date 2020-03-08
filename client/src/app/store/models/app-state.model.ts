import { TasksState } from '../reducers/tasks.reducer';

export interface AppState {
  readonly tasks: TasksState;
}
