import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';

const URL_ID_INDEX: number = 1;
const ID_ROUTE_URL: string = "id";
const NAME_ROUTE_URL: string = "name";
const PREVIEW_ROUTE_URL: string = "preview";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit {
  data: Object;
  loading: boolean;
  preview: boolean = false; //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
  article: Article;

  constructor(@Inject(ArticleService) private articleService: ArticleService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.loading = true;
  }

  ngOnInit() {
    this.article = new Article();

    let urlId: string = this.route.snapshot.url[URL_ID_INDEX].toString();
    switch(urlId) {
      case ID_ROUTE_URL:
        this.loadIdParam(this.route);
        break;
      case NAME_ROUTE_URL:
        this.loadNameParam(this.route);
        break;
      case PREVIEW_ROUTE_URL: //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION
        this.loadPreviewParam(this.route);
    }
  }

  loadIdParam(route: any) {
    let articleId: number;
    route.params.subscribe(params => { articleId = params['articleId']; });

    if(articleId) {
      this.loadArticleById(articleId);
    } else {  
      this.onError("Error loading article by id: " + articleId);
    }
  }

  loadNameParam(route: any) {
    let articleName: string;
    route.params.subscribe(params => { articleName = params['articleName']; });

    if(articleName) {
     this.loadArticleByName(articleName);
    } else {
      this.onError("Error loading article by name: " + articleName);
    }
  }

  //TODO: THIS SHOULD BE RESTRICTED IN PRODUCTION and its ugly
  loadPreviewParam(route: any) {
      let articleTitle: string;
      let articleSubTitle: string;
      let articleDate: Date;
      let articleContent: string;
      route.params.subscribe(params => { articleTitle = params['title']; });
      route.params.subscribe(params => { articleSubTitle = params['subtitle']; });
      route.params.subscribe(params => { articleDate = params['date']; });
      route.params.subscribe(params => { articleContent = params['content']; });

      this.article.title = articleTitle;
      this.article.subTitle = articleSubTitle;
      this.article.publishDate = articleDate;
      this.article.content = articleContent;

      this.loading = false;
      this.preview = true;

      //if anything goes wrong loading create params
      if(!this.article.title || !this.article.subTitle || !this.article.publishDate || !this.article.content) {
        this.article = new Article();
        this.onError('Error during routing');
      }
  }

  loadArticleById(articleId: number) {
    var self = this;
    this.articleService.getArticleById(articleId,
      function onArticle(article: Article): void {
        self.onSuccess(article);
      });
  }

  loadArticleByName(articleName: string) {
    var self = this;
    this.articleService.getArticleByName(articleName,
      function onArticle(article: Article): void {
        self.onSuccess(article);
      });
  }

  deleteArticle() {
    var self = this;
    this.articleService.deleteArticle(this.article,
      function onDelete(success: number): void {
        if(success >= 0) {
            self.router.navigate(["allArticles"]);
          } else {
            self.onError("Error deleting article");
          }
      });
  }

  onSuccess(article: Article) {
    this.loading = false;
    this.article = article;
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }
}
