import {Component, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.css']
})
export class MyCommentComponent implements OnInit {
  commentList: Comment[] = [];
  imageHost = Consts.IMAGE_HOST;

  constructor(private commentService: CommentService, private tokenStorage: TokenStorage) {
  }

  ngOnInit() {
    const params: Comment = new Comment();
    params.userId = this.tokenStorage.getUserId();
    this.commentService.list(params).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.commentList = jsonBean.data;
      }
    });
  }

}
