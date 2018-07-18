import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {MessageService} from '../service/message.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent extends BaseComponent implements OnInit {

  @Input() articleId: string;
  commentList: Comment[] = [];
  imageHost = Consts.IMAGE_HOST;

  constructor(private commentService: CommentService, snackBar: MatSnackBar,
              private messageService: MessageService, private toastr: ToastrService) {
    super(snackBar);
  }

  ngOnInit() {
    const params: Comment = new Comment();
    params.articleId = this.articleId;
    this.commentService.list(params).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.commentList = jsonBean.data;
      } else {
        // this.alert(jsonBean.message);
        this.toastr.success('还没有人吐槽过，来一发吧，亲！');
      }
    });
    this.messageService.getComment().subscribe(message => {
      const value = message.text;
      const comment = new Comment();
      comment.commentDate = value.commentDate;
      comment.content = value.content;
      comment.nickName = value.nickName;
      comment.userId = value.userId;
      this.commentList.push(comment);
    });
  }
}
