import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {

  @Input() articleId: string;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    console.log('ogOnInit执行了····' + this.articleId);
  }
}
