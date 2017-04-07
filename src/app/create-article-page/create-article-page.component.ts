import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-create-article-page',
  templateUrl: './create-article-page.component.html',
  styleUrls: ['./create-article-page.component.css']
})
export class CreateArticlePageComponent implements OnInit {
  article: Article;  

  constructor(private route: ActivatedRoute) { 
    this.article = new Article();
    this.loadParams(route);
  }

  loadParams(route: any): void {
    route.params.subscribe(params => { this.article.title = params['title']; });
    route.params.subscribe(params => { this.article.subTitle = params['subtitle']; });
    route.params.subscribe(params => { this.article.publishDate = params['date']; });
    route.params.subscribe(params => { this.article.content = params['content']; });

    if(this.article.title) {
      this.titleInputChanged();
    }
  }

  titleInputChanged() {
    this.article.name = this.article.title;
    this.article.name = this.article.name.split(' ').join('-');
    console.log(this.article.name);
  }

  ngOnInit() {
  }

}
