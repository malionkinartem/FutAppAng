import { TestBed, inject } from '@angular/core/testing';

import { DataListsService } from './data-lists.service';

describe('DataListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataListsService]
    });
  });

  it('should be created', inject([DataListsService], (service: DataListsService) => {
    expect(service).toBeTruthy();
  }));
});
