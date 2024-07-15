import { TestBed } from '@angular/core/testing';

import { TitleDashService } from './title-dash.service';

describe('TitleDashService', () => {
  let service: TitleDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
