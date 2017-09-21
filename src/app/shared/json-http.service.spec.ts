import { TestBed, inject } from '@angular/core/testing';

import { JsonHttpService } from './json-http.service';

describe('JsonHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonHttpService]
    });
  });

  it('should be created', inject([JsonHttpService], (service: JsonHttpService) => {
    expect(service).toBeTruthy();
  }));
});
