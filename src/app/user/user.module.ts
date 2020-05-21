import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {NgMetro4Module} from 'ng-metro4';
import {SelectComponent} from './select/select.component';
import {AddEditComponent} from './add-edit/add-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SelectComponent, AddEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgMetro4Module,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
