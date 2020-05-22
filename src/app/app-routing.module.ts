import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoggedInGuard} from './shared/guards/logged-in.guard';


const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule), canActivate: [ LoggedInGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'todo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
