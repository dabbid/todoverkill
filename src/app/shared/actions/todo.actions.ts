import { Action } from '@ngrx/store';

import Todo from '../models/todo.model';
import { TODO_LOADING, TODO_LOADED, TODO_UPDATING, TODO_UPDATED, RESET_TODO_UPDATED_STATE } from './todo.types';

interface CreatedTodo {
  description?:string;
  title:string;
}

interface UpdatedTodo {
  completed?:boolean;
  description?:string;
  title?:string;
}

// LOAD TODO
export class LoadTodoAction implements Action {
  readonly type = TODO_LOADING;

  constructor(public id:string) {}
}

export class TodoLoadedAction implements Action {
  readonly type = TODO_LOADED;

  constructor(public payload:Todo) {}
}

// UPDATE TODO
export class UpdateTodoAction implements Action {
  readonly type = TODO_UPDATING;

  constructor(public id:number, public payload:UpdatedTodo) {}
}

export class TodoUpdatedAction implements Action {
  readonly type = TODO_UPDATED;

  constructor(public payload:Todo) {}
}

export class ResetTodoUpdatedStateAction implements Action {
  readonly type = RESET_TODO_UPDATED_STATE;
}

export type All
  = LoadTodoAction
  | TodoLoadedAction
  | UpdateTodoAction
  | TodoUpdatedAction
  | ResetTodoUpdatedStateAction
;
