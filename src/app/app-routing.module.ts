import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserListComponent } from './components/user-list/user-list.component';

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
      }
    ],
    // runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
