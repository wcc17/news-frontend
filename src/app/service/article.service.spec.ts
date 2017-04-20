import { TestBed, inject } from '@angular/core/testing';
import { ArticleService } from '../service/article.service';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService]
    });
  });

  it('should ...', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
