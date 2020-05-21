import { Injectable } from '@angular/core';
import {SapphireDbService} from 'ng-sapphiredb';
import {BehaviorSubject} from 'rxjs';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$ = new BehaviorSubject<User>(null);

  constructor(private db: SapphireDbService) {}

  public login(user: User) {
    this.db.execute('user.login', user.id, user.username).subscribe((response) => {
      this.db.setAuthToken(response.result);
      this.currentUser$.next(user);
    });
  }
}
