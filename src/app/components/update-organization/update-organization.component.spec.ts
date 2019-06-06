import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganizationComponent } from './update-organization.component';

describe('UpdateOrganizationComponent', () => {
  let component: UpdateOrganizationComponent;
  let fixture: ComponentFixture<UpdateOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
