import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatRippleModule, MatTooltipModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter
} from '@angular/material';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DateRangePickerModule} from '@uiowa/date-range-picker';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {FooterComponent} from './components/footer/footer.component';
import {OrganizationListComponent} from './components/organization-list/organization-list.component';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {TaskCreateComponent} from './components/task-create/task-create.component';
import {TaskUpdateComponent} from './components/task-update/task-update.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {UserUpdateComponent} from './components/user-update/user-update.component';
import {CreateOrganizationComponent} from './components/create-organization/create-organization.component';
import {UpdateOrganizationComponent} from './components/update-organization/update-organization.component';
import {CommentListComponent} from './components/comment-list/comment-list.component';
import {CommentEditComponent} from './components/comment-edit/comment-edit.component';
import {UsersOrganizationComponent} from './components/users-organization/users-organization.component';
import {TransactionListComponent} from './components/transaction-list/transaction-list.component';
import {MatConfirmDialogComponent} from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import {ToastrModule} from 'ngx-toastr';
import { PasswordResetViaMailComponent } from './password-reset-via-mail/password-reset-via-mail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainComponent } from './components/main/main.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { InvestComponent } from './components/invest/invest.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './services/MomentUtcDateAdapter';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    OrganizationListComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    UserListComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    UserUpdateComponent,
    CreateOrganizationComponent,
    TransactionListComponent,
    UpdateOrganizationComponent,
    CommentListComponent,
    CommentEditComponent,
    UsersOrganizationComponent,
    MatConfirmDialogComponent,
    PasswordResetViaMailComponent,
    ForgotPasswordComponent,
    TaskDetailsComponent,
    MainComponent,
    BorrowComponent,
    InvestComponent,
    HowItWorksComponent,
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    NgbModule.forRoot(),
    DateRangePickerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot(
      {
        closeButton: true,
        disableTimeOut: true,
        maxOpened: 6,
        progressBar: true,
        newestOnTop: true,
        autoDismiss: true,
        countDuplicates: true,
        preventDuplicates: true
      }
    ),
    MatTooltipModule,
    MatProgressSpinnerModule,
    BrowserModule, NgxPaginationModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]

})
export class AppModule {
}
