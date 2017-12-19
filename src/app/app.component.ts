import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusyService } from './shared/services/busy.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnDestroy, OnInit {

  isBusy:boolean = false;
  shouldDisplayBackButton:boolean = false;
  sub:Subscription;

  constructor(private router:Router, private busyService:BusyService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.shouldDisplayBackButton = !router.isActive('/todos', true);
      }
    });
  }

  public ngOnInit() {
    console.log('SUBSCRIBED');
    this.sub = this.busyService.get().subscribe((value) => {
      console.log('BUSY', value);
      this.isBusy = value;
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
