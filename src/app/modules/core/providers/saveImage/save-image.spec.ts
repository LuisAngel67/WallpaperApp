import { TestBed } from '@angular/core/testing';

import { SaveImage } from './save-image';

describe('SaveImage', () => {
  let service: SaveImage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveImage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
