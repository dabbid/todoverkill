import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent {

  shouldDisplayBackButton:boolean = false;

  constructor(private router:Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.shouldDisplayBackButton = !router.isActive('/todos', true);
      }
    });
  }
}
