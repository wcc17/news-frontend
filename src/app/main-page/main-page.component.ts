import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';
import { Router } from '@angular/router';

const NUM_ARTICLES_TO_LOAD: number = 7;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  loading: boolean;
  articles: Article[];
  topArticle: Article;

  constructor(@Inject(ArticleService) private articleService: ArticleService,
              private router: Router) {
    this.loading = true;
  }

  loadArticles() {
    var self = this;
    this.articleService.getTopArticles(NUM_ARTICLES_TO_LOAD,
      function(articles: Article[]): void {
        self.onSuccess(articles);
      }
    )
  }

  onSuccess(articles: Article[]) {
    this.loading = false;
    this.articles = articles;
    this.topArticle = articles.shift();
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }

  getTopArticleImagePath() {
    return this.articleService.getArticleImagePath(this.topArticle);
  }

  ngOnInit() {
    this.loadArticles();
  }

}
