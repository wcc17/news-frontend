import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  @Input() article: Article;
  @Input() imagePath: string;

  constructor() {
  }

  ngOnInit() {
    this.post = new Post(this.article.title.toUpperCase(), 
                        this.article.subTitle.toUpperCase(), 
                        this.imagePath);
  }

}
