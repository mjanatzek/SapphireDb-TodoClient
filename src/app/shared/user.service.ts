import { Injectable } from '@angular/core';
import {SapphireDbService} from 'ng-sapphiredb';
import {BehaviorSubject} from 'rxjs';
import {User} from './models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$ = new BehaviorSubject<User>(null);

  constructor(private db: SapphireDbService, private router: Router) {}

  public login(user: User) {
    this.db.execute('user.login', user.id, user.username).subscribe((response) => {
      this.db.setAuthToken(response.result);
      this.currentUser$.next(user);
      this.router.navigateByUrl('/todo');
    });
  }
}
