import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';

describe('OrganizationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationService = TestBed.get(OrganizationService);
    expect(service).toBeTruthy();
  });
});
