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
      this.loading = false;
      this.preview = true;

      route.params.subscribe(params => { this.article.title = params['title']; });
      route.params.subscribe(params => { this.article.subTitle = params['subtitle']; });
      route.params.subscribe(params => { this.article.publishDate = params['date']; });
      route.params.subscribe(params => { this.article.content = params['content']; });

      //if anything goes wrong loading create params
      if(!this.article.title || !this.article.subTitle || !this.article.publishDate || !this.article.content) {
        this.article = new Article();
        this.onError('Error during routing');
      }
  }

  loadArticleById(articleId: number) {
    this.articleService.getArticleById(articleId)
      .subscribe(
        (article:Article) => {
          this.onSuccess(article);
        },
        error => {
          this.onError(error);
        }
    );
  }

  loadArticleByName(articleName: string) {
    this.articleService.getArticleByName(articleName)
      .subscribe(
        (article:Article) => {
          this.onSuccess(article);
        },
        error => {
          this.onError(error);
        }
    );
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article)
      .subscribe(
        () => {
          this.router.navigate(["allArticles"]);
        },
        error => {
          this.onError(error);
        }
    );
  }

  onSuccess(article: Article) {
    this.article = article;
    this.loading = false;
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(["error"]);
  }
}
