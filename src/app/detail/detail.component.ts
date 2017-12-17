import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import Todo from '../shared/models/todo.model';
import { LoadTodoAction } from '../shared/actions/todo.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy, OnInit {

  public todo:Observable<Todo>;
  public isLoading:Observable<boolean>;
  public isLoaded:Observable<boolean>;

  private sub:Subscription;

  constructor(private route:ActivatedRoute, private store:Store<any>) {
    this.isLoading = store.select('todo').select('loading');
    this.isLoaded = store.select('todo').select('loaded');
    this.todo = store.select('todo').select('data');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params:Params) => {
      this.store.dispatch(new LoadTodoAction(params.id));
    });
  }
}
