import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BusyService {

  private busy:Subject<boolean> = new Subject();

  public set(value:boolean) {
    this.busy.next(value);
  }

  public get():Observable<boolean> {
    return this.busy.asObservable();
  }
}
