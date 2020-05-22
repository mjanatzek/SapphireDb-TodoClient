import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {SapphireDbService} from 'ng-sapphiredb';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'mapUser'
})
export class MapUserPipe implements PipeTransform {

  static users$: Observable<User[]>;

  constructor(private db: SapphireDbService) {
    if (!MapUserPipe.users$) {
      MapUserPipe.users$ = this.db.collection<User>('users').values();
    }
  }

  transform(id: string): Observable<User> {
    return MapUserPipe.users$.pipe(
      map((users) => users.find(u => u.id === id))
    );
  }

}
