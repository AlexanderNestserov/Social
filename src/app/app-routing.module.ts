import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDeleteComponent } from './edit-delete/edit-delete.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'edit-delete',
    component: EditDeleteComponent,
  },];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
