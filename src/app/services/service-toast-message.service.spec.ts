import { TestBed } from '@angular/core/testing';

import { ServiceToastMessageService } from './service-toast-message.service';

describe('ServiceToastMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceToastMessageService = TestBed.get(ServiceToastMessageService);
    expect(service).toBeTruthy();
  });
});
