import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';

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
  maxPageNumber: number;
  pageNumbers: number[];

  constructor(@Inject(ArticleService) private articleService: ArticleService, private router: Router) { 
    this.loading = true;
    this.currentPageNumber = 1;

    this.initialize();
  }

  initialize() {
    this.getArticleCount();
    this.getArticlePage();
  }

  setPage(newPageNumber: number) {
    if( (newPageNumber > 0) && (newPageNumber <= (this.articleCount % PAGE_SIZE)+1)) {
      console.log("New Page number in setPage(): " + newPageNumber);

      this.currentPageNumber = newPageNumber;
      this.articles = [];
      this.initialize();
    }
  }

  fillPageNumbers() {
    this.pageNumbers = [];

    let pageLimit: number = 5;
    this.maxPageNumber = Math.ceil(this.articleCount / PAGE_SIZE);
    console.log("article count: " + this.articleCount);
    console.log("max pages: " + this.maxPageNumber);
    
    let startIndex: number;
    let endIndex: number;
    if(this.maxPageNumber < pageLimit) {
      pageLimit = this.maxPageNumber

      startIndex = 1;
      endIndex = pageLimit+1;
    } else {
      startIndex = this.currentPageNumber;
      endIndex = this.currentPageNumber + pageLimit;
    }

    
    for(var i = startIndex; i <= endIndex; i++) {
      if(i <= pageLimit) {
        this.pageNumbers.push(i);
      }
    }
  }

  getArticlePage() {
    this.articleService.loadPageOfArticles(this.currentPageNumber-1, PAGE_SIZE)
      .subscribe(
        (articles: Article[]) => {
          this.loading = false;
          this.articles = articles;
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
          this.fillPageNumbers();
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

  ngOnInit() {
  }

}
