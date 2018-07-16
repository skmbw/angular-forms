import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent extends BaseComponent implements OnInit {

  @Input() articleId: string;
  commentList: Comment[] = [];
  imageHost = Consts.IMAGE_HOST;

  constructor(private commentService: CommentService, snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
    const comment: Comment = new Comment();
    comment.articleId = this.articleId;
    this.commentService.list(comment).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.commentList = jsonBean.data;
      } else {
        this.alert(jsonBean.message);
      }
    });
  }
}
