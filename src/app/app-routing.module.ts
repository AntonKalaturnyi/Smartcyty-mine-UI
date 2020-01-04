import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import {CreateOrganizationComponent} from './components/create-organization/create-organization.component';
import {UpdateOrganizationComponent} from './components/update-organization/update-organization.component';
import {CommentListComponent} from './components/comment-list/comment-list.component';
import {CommentEditComponent} from './components/comment-edit/comment-edit.component';
import {UsersOrganizationComponent} from './components/users-organization/users-organization.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetViaMailComponent } from './password-reset-via-mail/password-reset-via-mail.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { MainComponent } from './components/main/main.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { InvestComponent } from './components/invest/invest.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';


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
        path: 'transactions/:id',
        component: TransactionListComponent
      },
      {
        path: 'task/create/:id',
        component: TaskCreateComponent
      },
      {
        path: 'task/edit/:id',
        component: TaskUpdateComponent
      },
      {
        path: 'task/details/:id',
        component: TaskDetailsComponent
      },
      {
        path: 'user-update',
        component: UserUpdateComponent
      },
      {
        path: 'comments/:id',
        component: CommentListComponent
      },
      {
        path: 'comments/edit/:id',
        component: CommentEditComponent
      },
      {
        path: 'create-organization',
        component: CreateOrganizationComponent
      },
      {
        path: 'update-organization/:id',
        component: UpdateOrganizationComponent
      },
      {
        path: 'users-organization/:id',
        component: UsersOrganizationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: PasswordResetViaMailComponent
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'borrow',
        component: BorrowComponent
      },
      {
        path: 'invest',
        component: InvestComponent
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
