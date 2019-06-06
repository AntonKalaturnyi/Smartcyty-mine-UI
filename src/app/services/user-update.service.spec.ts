import { TestBed } from '@angular/core/testing';

import { UserUpdateService } from './user-update.service';

describe('UserUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserUpdateService = TestBed.get(UserUpdateService);
    expect(service).toBeTruthy();
  });
});
