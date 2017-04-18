import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';
import { Router } from '@angular/router';

const ARTICLES_TO_LOAD: number = 7;

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
    this.articleService.loadTopArticles(ARTICLES_TO_LOAD)
      .subscribe(
        (articles: Article[]) => {
          this.onSuccess(articles);
        },
        error => {
          this.onError(error);
        }
      );
  }

  onSuccess(articles: Article[]) {
    for(let article of articles) {
      article.publishDate = this.articleService.convertPublishDate(article);
    }
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
