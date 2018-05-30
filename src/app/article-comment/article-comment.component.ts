import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  @Input()
  articleId: string;

  constructor() {
  }

  ngOnInit() {
  }

}
