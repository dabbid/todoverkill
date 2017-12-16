import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LoadTodosAction } from './list/rx/list.actions';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent {

  todos: Observable<Array<any>>;
  isLoading: Observable<boolean>;
  isLoaded: Observable<boolean>;

  constructor(private store:Store<any>) {
    this.isLoading = store.select('list').select('listLoading');
    this.isLoaded = store.select('list').select('listLoaded');
    this.todos = store.select('list').select('list');
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodosAction());
  }
}
