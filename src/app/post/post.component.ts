import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() article: Article;
  @Input() imagePath: string;

  constructor() {
  }

  ngOnInit() {
  }

}
