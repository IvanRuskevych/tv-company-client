import { TestBed } from '@angular/core/testing';

import { ShowsApiService } from './shows-api.service';

describe('ShowsApiService', () => {
  let service: ShowsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
