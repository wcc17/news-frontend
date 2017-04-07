import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post/post.model';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-small-post',
  templateUrl: './small-post.component.html',
  styleUrls: ['./small-post.component.css']
})
export class SmallPostComponent implements OnInit {
  post: Post;
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
    this.post = new Post(this.article.title.toUpperCase(), this.article.subTitle.toUpperCase());
  }

}
