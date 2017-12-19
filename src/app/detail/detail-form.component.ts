import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { CreateTodoAction, UpdateTodoAction, ResetTodoStateAction } from '../shared/actions/todo.actions';
import Todo from '../shared/models/todo.model';

@Component({
  selector: 'todo-detail-form',
  styleUrls: ['./detail-form.component.scss'],
  templateUrl: './detail-form.component.html',
})
export class DetailFormComponent implements OnInit, OnDestroy {

  @Input() mode:string;
  @Input() data:Todo;

  public form:FormGroup;

  private createdSub:Subscription;
  private updatedSub:Subscription;

  constructor(private router:Router, private store:Store<any>, public snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.initForm();
    this.createdSub = this.store.select('todo').select('created').subscribe((value:boolean) => {
      if (value === true) {
        this.snackBar.open(`New todo "${this.data.title}" has been created`, 'OK', { duration: 5000 });
        this.initForm();
        this.router.navigate(['/todos']);
      }
    });
    this.updatedSub = this.store.select('todo').select('updated').subscribe((value:boolean) => {
      if (value === true) {
        this.snackBar.open(`Your todo "${this.data.title}" has been updated!`, 'OK', { duration: 5000 });
        this.initForm();
      }
    });
  }

  public ngOnDestroy() {
    this.createdSub.unsubscribe();
    this.updatedSub.unsubscribe();
    this.store.dispatch(new ResetTodoStateAction());
  }

  public onBlur(name:string) {
    if (this.mode === 'edition' && this.form.controls[name].dirty && this.form.controls[name].valid) {
      this.updateTodoProperty(name);
    }
  }

  public onStateChange() {
    if (this.mode === 'edition') {
      this.updateTodoProperty('completed');
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      if (this.mode === 'creation') {
        this.store.dispatch(new CreateTodoAction(this.data));
      } else {
        this.store.dispatch(new UpdateTodoAction(this.data.id, this.data));
      }
    }
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
