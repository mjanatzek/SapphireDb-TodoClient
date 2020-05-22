import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SapphireDbService} from 'ng-sapphiredb';
import {TodoItem} from '../../shared/models/todo-item';
import {Router} from '@angular/router';

import * as moment from 'moment';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  users$: Observable<User[]>;

  form: FormGroup;

  constructor(private db: SapphireDbService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(undefined, [ Validators.required ]),
      description: new FormControl(undefined),
      assignedToId: new FormControl(undefined, [ Validators.required ]),
      dueDate: new FormControl(moment(), [ Validators.required ]),
    });

    this.users$ = this.db.collection<User>('users').values();
  }

  ngOnInit(): void {
  }

  save() {
    const formValue: TodoItem = this.form.value;
    this.db.collection('todoItems')
      .add(formValue)
      .subscribe(result => {
        if (result.results[0].error) {
          alert('Error');
          return;
        }

        const validationResults = result.results[0].validationResults;
        if (validationResults) {
          const message = Object.keys(validationResults)
            .map(key => [key, validationResults[key]])
            .map(([key, vr]: [string, string[]]) => `${key}: ${vr.join(',')}`)
            .join(',\n');

          alert(message);
          return;
        }

        this.router.navigateByUrl('/todo/list');
      });
  }
}
