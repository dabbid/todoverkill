import { Action } from '@ngrx/store';

import Todo from '../models/todo.model';
import { TODOS_LOADED, TODOS_LOAD } from './todos.types';

export class LoadTodosAction implements Action {
  readonly type = TODOS_LOAD;
}

export class TodosLoadedAction implements Action {
  readonly type = TODOS_LOADED;

  constructor(public payload:Array<Todo>) {}
}

export type All
  = LoadTodosAction
  | TodosLoadedAction
;
