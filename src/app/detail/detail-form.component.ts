import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { UpdateTodoAction, ResetTodoUpdatedStateAction } from '../shared/actions/todo.actions';
import Todo from '../shared/models/todo.model';

@Component({
  selector: 'todo-detail-form',
  styleUrls: ['./detail-form.component.scss'],
  templateUrl: './detail-form.component.html',
})
export class DetailFormComponent implements OnInit, OnDestroy {

  @Input() data:Todo

  form:FormGroup;
  updatedSub:Subscription;

  constructor(private store:Store<any>, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initForm();
    this.updatedSub = this.store.select('todo').select('updated').subscribe((value:boolean) => {
      if (value === true) {
        this.snackBar.open('Your todo has been updated!', 'OK', { duration: 5000 });
        this.initForm();
      }
    });
  }

  ngOnDestroy() {
    this.updatedSub.unsubscribe();
    this.store.dispatch(new ResetTodoUpdatedStateAction());
  }

  public onBlur(name:string) {
    if (this.form.controls[name].dirty && this.form.controls[name].valid) {
      this.updateTodoProperty(name);
    }
  }

  public onStateChange() {
    this.updateTodoProperty('completed');
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, Validators.required),
      state: new FormControl(this.data.completed),
      description: new FormControl(this.data.description),
    });
  }

  private updateTodoProperty(name:string) {
    this.store.dispatch(new UpdateTodoAction(this.data.id, { [name]: this.data[name] }));
  }
}
