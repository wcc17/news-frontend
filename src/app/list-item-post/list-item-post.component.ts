import { Component, OnInit, Input, Inject } from '@angular/core';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-list-item-post',
  templateUrl: './list-item-post.component.html',
  styleUrls: ['./list-item-post.component.css']
})
export class ListItemPostComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }
}
