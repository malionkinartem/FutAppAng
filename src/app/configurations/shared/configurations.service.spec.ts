import { TestBed, inject } from '@angular/core/testing';

import { ConfigurationsService } from './configurations.service';

describe('ConfigurationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationsService]
    });
  });

  it('should be created', inject([ConfigurationsService], (service: ConfigurationsService) => {
    expect(service).toBeTruthy();
  }));
});
