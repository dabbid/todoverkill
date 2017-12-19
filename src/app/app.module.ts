// Vendor
// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  { path: 'todo/create', component: DetailComponent },
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
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([TodosEffects]),
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,

    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ todo: todoReducer, todos: todosReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
