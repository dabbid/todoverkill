import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TODO_CREATE, TODO_LOAD, TODO_UPDATE } from '../actions/todo.types';
import { TODOS_LOAD } from '../actions/todos.types';
import {
  CreateTodoAction,
  LoadTodoAction,
  TodoCreatedAction,
  TodoLoadedAction,
  UpdateTodoAction,
  TodoUpdatedAction,
} from '../actions/todo.actions';
import { TodosLoadedAction } from '../actions/todos.actions';
import Todo from '../models/todo.model';

@Injectable()
export class TodosEffects {

  // LIST
  @Effect() loadTodos$: (Observable<Action>) = this.actions$
    .ofType(TODOS_LOAD)
    .mergeMap(() => new Promise((resolve) => {
      this.http.get('/api/todos').subscribe((todos:Array<Todo>) => resolve(new TodosLoadedAction(todos)))
    }));

  // CREATE
  @Effect() createTodo$: (Observable<Action>) = this.actions$
    .ofType(TODO_CREATE)
    .mergeMap((action:CreateTodoAction) => new Promise((resolve) => {
      this.http.post('/api/todos', action.payload).subscribe((todo:Todo) => resolve(new TodoCreatedAction(todo)))
    }));

  // READ
  @Effect() loadTodo$: (Observable<Action>) = this.actions$
    .ofType(TODO_LOAD)
    .mergeMap((action:LoadTodoAction) => new Promise((resolve) => {
      this.http.get(`/api/todos/${action.id}`).subscribe((todo:Todo) => resolve(new TodoLoadedAction(todo)))
    }))
  ;

  // UPDATE
  @Effect() updateTodo$: (Observable<Action>) = this.actions$
    .ofType(TODO_UPDATE)
    .mergeMap((action:UpdateTodoAction) => new Promise((resolve) => {
      this.http.put(`/api/todos/${action.id}`, action.payload).subscribe((todo:Todo) => resolve(new TodoUpdatedAction(todo)))
    }))
  ;

  constructor(private http:HttpClient, private actions$:Actions) {}
}