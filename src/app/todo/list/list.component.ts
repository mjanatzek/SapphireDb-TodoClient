import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {TodoItem} from '../../shared/models/todo-item';
import {SapphireDbService} from 'ng-sapphiredb';
import {UserService} from '../../shared/user.service';
import {DefaultCollection} from 'sapphiredb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  todoCollection: DefaultCollection<TodoItem>;
  todoItems$: Observable<TodoItem[]>;

  constructor(private db: SapphireDbService, public userService: UserService) {
    this.todoCollection = this.db.collection<TodoItem>('todoItems');
    this.todoItems$ = this.todoCollection.values();
  }

  ngOnInit(): void {
  }

  updateTodoItem(todo: TodoItem) {
    this.todoCollection.update(todo);
  }

}
