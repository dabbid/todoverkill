import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import Todo from '../shared/models/todo.model';
import { LoadTodoAction } from '../shared/actions/todo.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

  public todo:Observable<Todo>;
  public isLoading:Observable<boolean>;
  public isLoaded:Observable<boolean>;
  public mode:string;

  private routeSnapshot:ActivatedRouteSnapshot;
  private sub:Subscription;

  constructor(private route:ActivatedRoute, private store:Store<any>) {
    this.routeSnapshot = this.route.snapshot;
    this.mode = 'creation';
    this.isLoaded = Observable.create((observer:Observer<boolean>) => observer.next(false));
    this.isLoaded = Observable.create((observer:Observer<boolean>) => observer.next(true));
    this.todo = store.select('todo').select('data');
    if (typeof route.snapshot.params.id === 'string') {
      this.mode = 'edition';
      this.isLoading = store.select('todo').select('loading');
      this.isLoaded = store.select('todo').select('loaded');
    }
  }

  public ngOnInit() {
    if (this.mode === 'edition') {
      this.store.dispatch(new LoadTodoAction(this.routeSnapshot.params.id));
    }
  }
}
