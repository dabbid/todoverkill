// Vendor
// modules
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

// App
// components
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { DetailFormComponent } from './detail/detail-form.component';
import { ListComponent } from './list/list.component';
// services
import { TodosEffects } from './shared/effects/todos.effects';
// reducers
import todoReducer from './shared/reducers/todo.reducer';
import todosReducer from './shared/reducers/todos.reducer';

const appRoutes: Routes = [
{ path: '',   redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: ListComponent },
  { path: 'todos/:id', component: DetailComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    DetailFormComponent,
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([TodosEffects]),
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ todo: todoReducer, todos: todosReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
