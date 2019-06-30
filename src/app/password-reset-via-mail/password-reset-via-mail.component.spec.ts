import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetViaMailComponent } from './password-reset-via-mail.component';

describe('PasswordResetViaMailComponent', () => {
  let component: PasswordResetViaMailComponent;
  let fixture: ComponentFixture<PasswordResetViaMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetViaMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetViaMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
