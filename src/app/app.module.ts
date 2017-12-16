import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { TodosEffects } from './shared/todos.service';

import listReducer from './list/rx/list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([TodosEffects]),

    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    StoreModule.forRoot({ list: listReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
