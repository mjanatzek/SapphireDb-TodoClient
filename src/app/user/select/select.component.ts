import { Component, OnInit } from '@angular/core';
import {SapphireDbService} from 'ng-sapphiredb';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private db: SapphireDbService, private userService: UserService) {
    this.users$ = this.db.collection<User>('users').values();
  }

  ngOnInit(): void {
  }

  login(user: User) {
    this.userService.login(user);
  }

}
