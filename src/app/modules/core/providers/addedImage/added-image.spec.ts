import { TestBed } from '@angular/core/testing';

import { AddedImage } from './added-image';

describe('AddedImage', () => {
  let service: AddedImage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddedImage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
