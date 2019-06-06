import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import {CreateOrganizationComponent} from './components/create-organization/create-organization.component';
import {UpdateOrganizationComponent} from './components/update-organization/update-organization.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'organizations',
        component: OrganizationListComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'tasks/:id',
        component: TaskListComponent
      },
      {
        path: 'task/create/:id',
        component: TaskCreateComponent
      },
      {
        path: 'user-update',
        component: UserUpdateComponent
      },
      {
        path: 'password-update',
        component: PasswordUpdateComponent
      },
      {
        path: 'create-organization',
        component: CreateOrganizationComponent
      },
      {
        path: 'update-organization/:id',
        component: UpdateOrganizationComponent
      }
    ],
    // runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
