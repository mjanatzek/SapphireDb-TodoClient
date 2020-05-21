import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectComponent} from './select/select.component';
import {AddEditComponent} from './add-edit/add-edit.component';


const routes: Routes = [
  { path: 'add', component: AddEditComponent },
  { path: 'edit/:id', component: AddEditComponent },
  { path: 'select', component: SelectComponent },
  { path: '**', redirectTo: 'select', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
