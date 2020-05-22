import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {TodoItem} from '../../shared/models/todo-item';
import {SapphireDbService} from 'ng-sapphiredb';
import {User} from '../../shared/models/user';
import {map} from 'rxjs/operators';

interface UserWithTodos {
  user: User;
  todoItems: TodoItem[];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  users$: Observable<User[]>;
  todoItems$: Observable<TodoItem[]>;

  usersWithTodos$: Observable<UserWithTodos[]>;

  constructor(private db: SapphireDbService) {
    this.users$ = this.db.collection<User>('users').values();
    this.todoItems$ = this.db.collection<TodoItem>('todoItems').values();

    this.usersWithTodos$ = combineLatest([this.users$, this.todoItems$]).pipe(
      map(([users, todoItems]: [User[], TodoItem[]]) => {
        return users.map(user => ({
          user,
          todoItems: todoItems.filter(t => t.assignedToId === user.id)
        } as UserWithTodos));
      })
    );
  }

  ngOnInit(): void {
  }
}
