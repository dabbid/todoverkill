import { Action } from '@ngrx/store';
import { LIST_LOADED, LIST_LOADING } from './list.types';

export class LoadTodosAction implements Action {
  readonly type = LIST_LOADING;
}

export class TodosLoadedAction implements Action {
  readonly type = LIST_LOADED;

  constructor(public payload:Array<any>) {}
}

export type All
  = LoadTodosAction
  | TodosLoadedAction
;
