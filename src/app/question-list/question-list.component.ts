import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {ToastrService} from 'ngx-toastr';
import {Consts} from '../common/consts';
import {Question} from '../model/question';
import {faBars, faChevronLeft, faChevronRight, faEdit, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Input()
  userId: string;
  imageHost = Consts.IMAGE_HOST;
  questionList: Question[] = [];
  faBars = faBars;
  faHeart = faHeart;
  faPlus = faPlus;
  faEdit = faEdit;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  page = 0;
  init = false;

  constructor(private questionService: QuestionService, private toastr: ToastrService,
              private router: Router) {
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
    // console.log('pg=' + pg);
    this.questionService.list({'page': pg}).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.questionList = jsonBean.data;
        if (this.questionList !== undefined && this.questionList.length > 0) {
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

  update(question: Question) {
    this.router.navigateByUrl('ask?id=' + question.id).catch();
  }
}
