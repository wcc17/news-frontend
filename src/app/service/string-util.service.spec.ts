import { TestBed, inject } from '@angular/core/testing';
import { StringUtilService } from '../service/string-util.service';

describe('StringUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringUtilService]
    });
  });

  it('should ...', inject([StringUtilService], (service: StringUtilService) => {
    expect(service).toBeTruthy();
  }));
});
