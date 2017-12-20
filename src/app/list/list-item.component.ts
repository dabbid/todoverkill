import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdateTodoAction } from '../shared/actions/todo.actions';
import Todo from '../shared/models/todo.model';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() data:Todo;

  public changed:boolean = false;

  private timer:number;

  constructor(private store:Store<any>) {}

  public ngOnInit() {
    this.changed = false;
  }

  public ngOnDestroy() {
    window.clearTimeout(this.timer);
  }

  public onTodoStateChange(id:number, state:boolean):void {
    this.timer = window.setTimeout(() => {
      this.changed = true;
      this.timer = window.setTimeout(() => {
        this.store.dispatch(new UpdateTodoAction(id, { completed: state }));
      }, 300);
    }, 100);
  }
}
