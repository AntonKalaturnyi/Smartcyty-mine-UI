import { TestBed } from '@angular/core/testing';

import { PasswordResetViaMailService } from './password-reset-via-mail.service';

describe('PasswordResetViaMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordResetViaMailService = TestBed.get(PasswordResetViaMailService);
    expect(service).toBeTruthy();
  });
});
