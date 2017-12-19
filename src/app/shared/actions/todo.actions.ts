import { Action } from '@ngrx/store';

import Todo from '../models/todo.model';
import {
  TODO_CREATE,
  TODO_CREATED,
  TODO_LOAD,
  TODO_LOADED,
  TODO_UPDATE,
  TODO_UPDATED,
  RESET_TODO_STATE,
} from './todo.types';

interface CreatedTodo {
  description?:string;
  title:string;
}

interface UpdatedTodo {
  completed?:boolean;
  description?:string;
  title?:string;
}

// CREATE TODO
export class CreateTodoAction implements Action {
  readonly type = TODO_CREATE;

  constructor(public payload:CreatedTodo) {}
}

export class TodoCreatedAction implements Action {
  readonly type = TODO_CREATED;

  constructor(public payload:Todo) {}
}

// LOAD TODO
export class LoadTodoAction implements Action {
  readonly type = TODO_LOAD;

  constructor(public id:string) {}
}

export class TodoLoadedAction implements Action {
  readonly type = TODO_LOADED;

  constructor(public payload:Todo) {}
}

// UPDATE TODO
export class UpdateTodoAction implements Action {
  readonly type = TODO_UPDATE;

  constructor(public id:number, public payload:UpdatedTodo) {}
}

export class TodoUpdatedAction implements Action {
  readonly type = TODO_UPDATED;

  constructor(public payload:Todo) {}
}

export class ResetTodoStateAction implements Action {
  readonly type = RESET_TODO_STATE;
}

export type All
  = CreateTodoAction
  | TodoCreatedAction
  | LoadTodoAction
  | TodoLoadedAction
  | UpdateTodoAction
  | TodoUpdatedAction
  | ResetTodoStateAction
;
