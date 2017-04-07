import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post/post.model';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-list-item-post',
  templateUrl: './list-item-post.component.html',
  styleUrls: ['./list-item-post.component.css']
})
export class ListItemPostComponent implements OnInit {
  post: Post;
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
    this.post = new Post(this.article.title.toUpperCase(), this.article.subTitle.toUpperCase());
  }

}
