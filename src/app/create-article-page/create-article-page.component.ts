import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-create-article-page',
  templateUrl: './create-article-page.component.html',
  styleUrls: ['./create-article-page.component.css']
})
export class CreateArticlePageComponent implements OnInit {
  article: Article;  

  constructor(@Inject(ArticleService) private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadParams();
  }

  loadParams(): void {
    this.article = new Article();

    if(this.route.snapshot.url[1] != null) {
      this.route.params.subscribe(params => { this.article.id = params['id']; });
      this.route.params.subscribe(params => { this.article.title = params['title']; });
      this.route.params.subscribe(params => { this.article.subTitle = params['subtitle']; });
      this.route.params.subscribe(params => { this.article.publishDate = params['date']; });
      this.route.params.subscribe(params => { this.article.content = params['content']; });

      //TODO: WILL NEED TO CONVERT THIS DATE TO PROPER FORMAT?
      // this.article = this.articleService.convertPublishDate(this.article);
      console.log(this.article);

      if(this.article.title) {
        this.titleInputChanged();
      }
    }
  }

  titleInputChanged() {
    this.article.name = this.article.title;
    this.article.name = this.article.name.split(' ').join('-');
    this.article.name = this.article.name.toLowerCase();
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  onSaveClick() {
    if(this.article.id) {
      this.updateArticle();
    } else {
      this.saveArticle();
    }
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  updateArticle() {
    var self = this;
    this.articleService.updateArticle(this.article, 
      function(articleId: number): void {
        self.onRequestSuccess(articleId);
      });
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  saveArticle() {
    var self = this;
    this.articleService.createArticle(this.article,
      function(articleId: number): void {
        self.onRequestSuccess(articleId);
      })
  }

  onRequestSuccess(articleId: number) {
    if(articleId == -1) {
      this.onError("Error creating article");
    } else {
      this.router.navigate(['/article', 'id', articleId]);
    }
  }

  onError(error: any) {
    console.log(error);
    // this.router.navigate(["error"]);
    //TODO: WILL WANT TO SHOW ERROR MESSAGE.
    //can check if something is missing on the page
    //otherwise just print a message that says error from API
    //pretty low priority though. I'm the only one who will use this page and I can look at the console
  }
}
