import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { BusyService } from '../shared/services/busy.service';
import { LoadTodosAction } from '../shared/actions/todos.actions';
import { UpdateTodoAction, ResetTodoStateAction } from '../shared/actions/todo.actions';
import Todo from '../shared/models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {

  public completedTodos:Array<Todo>;
  public pendingTodos:Array<Todo>;
  public isLoaded:boolean = false;

  private subLoaded:Subscription;
  private subTodos:Subscription;

  constructor(private store:Store<any>, private busyService:BusyService) {
    this.subLoaded = store.select('todos').select('loaded').subscribe((value:boolean) => {
      this.isLoaded = value;
      if (this.isLoaded) {
        this.busyService.set(false);
      }
    });
    this.subTodos = store.select('todos').select('list').subscribe((list:Array<Todo>) => {
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
      this.pendingTodos = pendingTodos;
      this.completedTodos = completedTodos.reverse();
    });
  }

  public ngOnInit() {
    this.busyService.set(true);
    this.store.dispatch(new LoadTodosAction());
  }

  public ngOnDestroy() {
    this.subLoaded.unsubscribe();
    this.subTodos.unsubscribe();
    this.store.dispatch(new ResetTodoStateAction());
  }

  public onTodoStateChange(id:number, state:boolean):void {
    this.store.dispatch(new UpdateTodoAction(id, { completed: state }));
  }
}
