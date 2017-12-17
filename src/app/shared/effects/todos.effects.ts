import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TODO_LOADING, TODO_UPDATING } from '../actions/todo.types';
import { TODOS_LOADING } from '../actions/todos.types';
import { LoadTodoAction, TodoLoadedAction, UpdateTodoAction, TodoUpdatedAction } from '../actions/todo.actions';
import { TodosLoadedAction } from '../actions/todos.actions';
import Todo from '../models/todo.model';

@Injectable()
export class TodosEffects {

  @Effect() loadTodos$: (Observable<Action>) = this.actions$
    .ofType(TODOS_LOADING)
    .mergeMap(() => new Promise((resolve) => {
      this.http.get('/api/todos').subscribe((todos:Array<Todo>) => resolve(new TodosLoadedAction(todos)))
    }));

  @Effect() loadTodo$: (Observable<Action>) = this.actions$
    .ofType(TODO_LOADING)
    .mergeMap((action:LoadTodoAction) => new Promise((resolve) => {
      this.http.get(`/api/todos/${action.id}`).subscribe((todo:Todo) => resolve(new TodoLoadedAction(todo)))
    }))
  ;

  @Effect() updateTodo$: (Observable<Action>) = this.actions$
    .ofType(TODO_UPDATING)
    .mergeMap((action:UpdateTodoAction) => new Promise((resolve) => {
      this.http.put(`/api/todos/${action.id}`, action.payload).subscribe((todo:Todo) => resolve(new TodoUpdatedAction(todo)))
    }))
  ;

  constructor(private http:HttpClient, private actions$:Actions) {}
}