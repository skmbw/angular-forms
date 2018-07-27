import {Component, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {ToastrService} from 'ngx-toastr';
import {faBars, faChevronLeft, faChevronRight, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ConfirmService} from '../service/confirm.service';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {
  answerList: Answer[] = [];
  imageHost = Consts.IMAGE_HOST;
  page = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTrashAlt = faTrashAlt;
  faBars = faBars;
  init = false;

  constructor(private answerService: AnswerService, private tokenStorage: TokenStorage,
              private toastr: ToastrService, private confirmService: ConfirmService) {
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
    const param: Answer = new Answer();
    param.answerUserId = this.tokenStorage.getUserId();
    param.page = pg;
    this.answerService.list(param).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answerList = jsonBean.data;
        if (this.answerList !== undefined && this.answerList.length > 0) {
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

  delete(answer: Answer) {
    this.confirmService.confirm('删除后不能恢复，您确定删除该回答？').subscribe(value => {
      if (value) {
        this.answerService.delete(answer).subscribe(result => {
          if (result.code === 1) {
            this.toastr.success('删除回答成功！');
            this.answerList.splice(this.answerList.indexOf(answer), 1);
          } else {
            this.toastr.info(result.message);
          }
        });
      }
    });
  }
}
