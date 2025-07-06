import { TestBed } from '@angular/core/testing';

import { VisitorService } from './visitor.service';

describe('Visitor', () => {
  let service: Visitor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
