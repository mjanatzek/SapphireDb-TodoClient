import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {TodoItem} from '../../shared/models/todo-item';
import {SapphireDbService} from 'ng-sapphiredb';
import {UserService} from '../../shared/user.service';
import {DefaultCollection} from 'sapphiredb';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  todoCollection: DefaultCollection<TodoItem>;
  todoItems$: Observable<TodoItem[]>;

  changeProgressSubject$ = new Subject<[TodoItem, number]>();

  private changeProgressSubscription?: Subscription;

  constructor(private db: SapphireDbService, public userService: UserService) {
    this.todoCollection = this.db.collection<TodoItem>('todoItems');
    this.todoItems$ = this.todoCollection.values();

    this.changeProgressSubject$.pipe(
      debounceTime(200)
    ).subscribe(([changedTodo, newProgress]) => {
      this.todoCollection.update({
        ...changedTodo,
        progress: newProgress
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.changeProgressSubscription?.unsubscribe();
  }

}
