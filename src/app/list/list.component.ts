import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LoadTodosAction } from '../shared/actions/todos.actions';
import { UpdateTodoAction } from '../shared/actions/todo.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public todos:Observable<Array<any>>;
  public isLoading:Observable<boolean>;
  public isLoaded:Observable<boolean>;

  constructor(private store:Store<any>) {
    this.isLoading = store.select('todos').select('loading');
    this.isLoaded = store.select('todos').select('loaded');
    this.todos = store.select('todos').select('list');
  }

  public onTodoStateChange(id:number, state:boolean):void {
    console.log('state', state)
    this.store.dispatch(new UpdateTodoAction(id, { completed: state }));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodosAction());
  }
}
