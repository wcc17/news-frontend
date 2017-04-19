import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';
import { PaginationModule } from 'ng2-bootstrap';

const PAGE_SIZE: number = 10;

@Component({
  selector: 'app-all-articles-page',
  templateUrl: './all-articles-page.component.html',
  styleUrls: ['./all-articles-page.component.css']
})
export class AllArticlesPageComponent implements OnInit {
  loading: boolean;
  articles: Article[];
  articleCount: number;
  currentPageNumber: number;

  constructor(@Inject(ArticleService) private articleService: ArticleService, private router: Router) { 
    this.loading = true;
    this.currentPageNumber = 1;
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.getArticleCount();
    this.getArticlePage();
  }

  setPage(event: any) {
    console.log("New Page number in setPage(): " + event.page);

    this.currentPageNumber = event.page;
    this.articles = [];

    this.initialize();
  }

  getArticlePage() {
    this.articleService.getPageOfArticles(this.currentPageNumber-1, PAGE_SIZE)
      .subscribe(
        (articles: Article[]) => {
          articles = this.articleService.convertPublishDatesFromAPI(articles);
          console.log(articles);
          this.articles = articles;
          this.loading = false;
        },
        error => {
          this.onError(error);
        }
      );
  }

  getArticleCount() {
    this.articleService.getArticleCount()
      .subscribe(
        (count: number) => {
          this.articleCount = count;
        },
        error => {
          this.onError(error);
        }
      );
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }
}
