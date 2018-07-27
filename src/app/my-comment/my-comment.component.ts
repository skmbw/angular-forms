import {Component, OnInit} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {ToastrService} from 'ngx-toastr';
import {faBars, faChevronLeft, faChevronRight, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ConfirmService} from '../service/confirm.service';

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
  faBars = faBars;
  faTrashAlt = faTrashAlt;
  init = false;

  constructor(private commentService: CommentService, private tokenStorage: TokenStorage,
              private toastr: ToastrService, private confirm: ConfirmService) {
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
          if (this.init) {
            this.toastr.success('没有更多数据了，亲！');
          }
        }
      } else {
        if (this.init) {
          this.toastr.info(jsonBean.message);
        }
      }
      this.init = true;
    });
  }

  delete(comment: Comment) {
    this.confirm.confirm('删除后不可恢复，您确定删除该评论？').subscribe(value => {
      if (value) {
        this.commentService.delete(comment).subscribe(result => {
          if (result.code === 1) {
            this.toastr.success('删除评论成功！');
            this.commentList.splice(this.commentList.indexOf(comment), 1);
          } else {
            this.toastr.info(result.message);
          }
        });
      }
    });
  }
}
