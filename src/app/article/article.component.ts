import { Component, OnInit, Input, Inject } from '@angular/core';
import { Article } from './article.model';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() url: string;

  constructor(@Inject(ArticleService) private articleService: ArticleService) { }

  ngOnInit() {
  }
}
