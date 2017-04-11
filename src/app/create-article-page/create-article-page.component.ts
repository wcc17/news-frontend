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
              private router: Router) { 
    this.article = new Article();
    this.loadParams(route);
  }

  loadParams(route: any): void {
    route.params.subscribe(params => { this.article.title = params['title']; });
    route.params.subscribe(params => { this.article.subTitle = params['subtitle']; });
    route.params.subscribe(params => { this.article.publishDate = params['date']; });
    route.params.subscribe(params => { this.article.content = params['content']; });

    console.log("loading params on create-article page");
    
    if(this.article.title) {
      this.titleInputChanged();
    }
  }

  titleInputChanged() {
    this.article.name = this.article.title;
    this.article.name = this.article.name.split(' ').join('-');
    console.log(this.article.name);
  }

  //TODO: THIS NEEDS TO BE RESTRICTED IN PRODUCTION
  saveArticle() {
    this.articleService.createArticle(this.article)
      .subscribe(
        (articleId: number) => {
          this.onRequestSuccess(articleId);
        },
        error => {
          this.onError(error);
        }
      )
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

  ngOnInit() {
  }

}
