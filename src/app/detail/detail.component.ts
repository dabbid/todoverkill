import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { BusyService } from '../shared/services/busy.service';
import Todo from '../shared/models/todo.model';
import { LoadTodoAction } from '../shared/actions/todo.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit, OnDestroy {

  public todo:Observable<Todo>;
  public isLoaded:boolean = false;
  public mode:string = 'creation';

  private routeSnapshot:ActivatedRouteSnapshot;
  private subLoaded:Subscription;

  constructor(private route:ActivatedRoute, private store:Store<any>, private busyService:BusyService) {
    this.todo = store.select('todo').select('data');
    this.routeSnapshot = route.snapshot;
    if (typeof this.routeSnapshot.params.id === 'string') {
      this.mode = 'edition';
      this.subLoaded = store.select('todo').select('loaded').subscribe((value:boolean) => {
        this.isLoaded = value;
        if (this.isLoaded) {
          this.busyService.set(false);
        }
      });
    }
  }

  public ngOnInit() {
    if (this.mode === 'edition') {
      this.busyService.set(true);
      this.store.dispatch(new LoadTodoAction(this.routeSnapshot.params.id));
    }
  }

  public ngOnDestroy() {
    if (this.mode === 'edition') {
      this.subLoaded.unsubscribe();
    }
  }
}
