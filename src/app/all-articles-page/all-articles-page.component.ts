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
    if( (newPageNumber > 0) && (newPageNumber <= this.maxPageNumber)) {
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
      if(this.currentPageNumber < 3) {
        //force behavior for the first few pages
        startIndex = 1;
      } else {
        startIndex = this.currentPageNumber - 2;
      }

      if(endIndex > this.maxPageNumber) {
        endIndex = this.maxPageNumber;
      } else {
        endIndex = startIndex + (pageLimit - 1);
      }

      console.log("startIndex: " + startIndex);
      console.log("endIndex: " + endIndex);
    }
    
    for(var i = startIndex; i <= endIndex; i++) {
      if(i <= this.maxPageNumber) {
        this.pageNumbers.push(i);
      }
    }

    //force behavior for the last few pages if there aren't enough on screen
    if(this.pageNumbers.length < pageLimit) {
      for(var i = 0; i <= pageLimit - this.pageNumbers.length; i++) {
        this.pageNumbers.unshift(this.pageNumbers[0] - 1);
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
          this.onArticleCount(count);
        },
        error => {
          this.onError(error);
        }
      );
  }

  onArticleCount(count: number) {
    this.articleCount = count;
    this.fillPageNumbers();
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }

  ngOnInit() {
  }

}
