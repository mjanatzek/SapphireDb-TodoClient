import { Component, OnInit } from '@angular/core';
import {SapphireDbService} from 'ng-sapphiredb';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateRangeResponse, DefaultCollection, OfflineResponse, UpdateRangeResponse} from 'sapphiredb';
import {User} from '../../shared/models/user';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.less']
})
export class AddEditComponent implements OnInit {

  private userCollection: DefaultCollection<User>;

  public form: FormGroup;

  constructor(private db: SapphireDbService, private route: ActivatedRoute, private router: Router) {
    // Create/load user collection
    this.userCollection = this.db.collection('users');

    // Create form
    this.form = new FormGroup({
      id: new FormControl(),
      username: new FormControl(null, [ Validators.required ])
    });

    // Fill form with user data if an id was passed as parameter
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        const firstUser$ = this.userCollection.where(['id', '==', params.id]).first().snapshot();

        firstUser$.pipe(take(1)).subscribe((user) => {
          this.form.patchValue(user);
        });
      }
    });

  }

  save() {
    const formValue: User = this.form.value;

    let results$: Observable<OfflineResponse|CreateRangeResponse|UpdateRangeResponse>;

    if (formValue.id) {
      results$ = this.userCollection.update(formValue);
    } else {
      results$ = this.userCollection.add({
        username: formValue.username
      });
    }

    results$.subscribe(result => {
      const validationResults = result.results[0].validationResults;
      if (validationResults) {
        const message = Object.keys(validationResults)
          .map(key => [key, validationResults[key]])
          .map(([key, vr]: [string, string[]]) => `${key}: ${vr.join(',')}`)
          .join(',\n');

        alert(message);
      } else {
        this.router.navigateByUrl('/user/select');
      }
    });
  }

  ngOnInit(): void {
  }

}
