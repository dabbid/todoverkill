import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LoadTodosAction } from '../shared/actions/todos.actions';
import { UpdateTodoAction, ResetTodoUpdatedStateAction } from '../shared/actions/todo.actions';
import Todo from '../shared/models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public todos:Array<Todo>;
  public isLoading:Observable<boolean>;
  public isLoaded:Observable<boolean>;

  constructor(private store:Store<any>) {
    this.isLoading = store.select('todos').select('loading');
    this.isLoaded = store.select('todos').select('loaded');
    const todos = store.select('todos').select('list');
    todos.subscribe((list:Array<Todo>) => {
      const completedTodos:Array<Todo> = [];
      const pendingTodos:Array<Todo> = [];
      list
        .sort((a, b) => Date.parse(b.modified_at || b.created_at) - Date.parse(a.modified_at || a.created_at))
        .forEach((todo:Todo) => {
          if (todo.completed) {
            completedTodos.push(todo);
          } else {
            pendingTodos.push(todo);
          }
        })
      ;
      this.todos = pendingTodos.concat(completedTodos.reverse());
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodosAction());
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetTodoUpdatedStateAction());
  }

  public onTodoStateChange(id:number, state:boolean):void {
    this.store.dispatch(new UpdateTodoAction(id, { completed: state }));
  }
}
