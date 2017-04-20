import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-small-post',
  templateUrl: './small-post.component.html',
  styleUrls: ['./small-post.component.css']
})
export class SmallPostComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}
