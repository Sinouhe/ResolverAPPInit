import { TestBed } from '@angular/core/testing';

import { ServiceAuthentificationService } from './service-authentification.service';
import { HttpClientModule } from '@angular/common/http';

describe('ServiceAuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [
      HttpClientModule,
      ],
    providers: [
    ]
  }));

  it('should be created', () => {
    const service: ServiceAuthentificationService = TestBed.get(ServiceAuthentificationService);
    expect(service).toBeTruthy();
  });
});
