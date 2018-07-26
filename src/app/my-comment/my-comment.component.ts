import {Component, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {ToastrService} from 'ngx-toastr';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.css']
})
export class MyCommentComponent implements OnInit {
  commentList: Comment[] = [];
  imageHost = Consts.IMAGE_HOST;
  page = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private commentService: CommentService, private tokenStorage: TokenStorage,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(p: number) {
    let pg = this.page;
    if (p === -1) {
      pg = this.page - 1;
      if (pg < 1) {
        pg = 1;
      }
    } else {
      pg += 1;
    }
    const params: Comment = new Comment();
    params.userId = this.tokenStorage.getUserId();
    params.page = pg;
    this.commentService.list(params).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.commentList = jsonBean.data;
        if (this.commentList !== undefined && this.commentList.length > 0) {
          this.page += p;
          if (this.page === 0) {
            this.page = 1;
          }
        } else {
          this.toastr.success('没有更多数据了，亲！');
        }
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }
}
