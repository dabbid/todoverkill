import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LIST_LOADING } from '../list/rx/list.types';
import { TodosLoadedAction } from '../list/rx/list.actions';

@Injectable()
export class TodosEffects {
  @Effect() loadTodos$: (Observable<Action>) = this.actions$.ofType(LIST_LOADING)
    .mergeMap(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve(new TodosLoadedAction(['truc', 'bidule']));
      }, 1000);
    }));

  constructor(private actions$:Actions) {}
}