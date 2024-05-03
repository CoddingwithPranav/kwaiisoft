import { TestBed } from '@angular/core/testing';

import { NgxUiLoaderServiceService } from './ngx-ui-loader-service.service';

describe('NgxUiLoaderServiceService', () => {
  let service: NgxUiLoaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUiLoaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
