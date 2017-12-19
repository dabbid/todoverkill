import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusyService } from './shared/services/busy.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnDestroy, OnInit {

  public isBusy:boolean = false;
  public shouldDisplayBackButton:boolean = false;

  private subBusy:Subscription;
  private subRouter:Subscription;

  constructor(private router:Router, private busyService:BusyService) {
    this.subRouter = router.events.subscribe((event:RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.shouldDisplayBackButton = !router.isActive('/todos', true);
      }
    });
  }

  public ngOnInit() {
    this.subBusy = this.busyService.get().subscribe((value:boolean) => {
      this.isBusy = value;
    });
  }

  public ngOnDestroy() {
    this.subRouter.unsubscribe();
    this.subBusy.unsubscribe();
  }
}
