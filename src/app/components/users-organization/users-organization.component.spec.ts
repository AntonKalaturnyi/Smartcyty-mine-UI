import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOrganizationComponent } from './users-organization.component';

describe('UsersOrganizationComponent', () => {
  let component: UsersOrganizationComponent;
  let fixture: ComponentFixture<UsersOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
