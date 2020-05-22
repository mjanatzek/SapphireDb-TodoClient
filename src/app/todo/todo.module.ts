import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {ListComponent} from './list/list.component';
import {NgMetro4Module} from 'ng-metro4';
import {MapUserPipe} from '../shared/pipes/map-user.pipe';


@NgModule({
  declarations: [ListComponent, MapUserPipe],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NgMetro4Module
  ]
})
export class TodoModule { }
