import { TestBed } from '@angular/core/testing';

import { ComponentMessageService } from './component-message.service';

describe('ComponentMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentMessageService = TestBed.get(ComponentMessageService);
    expect(service).toBeTruthy();
  });
});
