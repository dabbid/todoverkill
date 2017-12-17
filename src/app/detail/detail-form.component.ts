import { Component, Input } from '@angular/core';

import Todo from '../shared/models/todo.model';

@Component({
    selector: 'todo-detail-form',
    templateUrl: './detail-form.component.html',
})
export class DetailFormComponent {

  @Input() data:Todo
}