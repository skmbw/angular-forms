import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {Question} from '../model/question';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {faBars, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {LoveService} from '../service/love.service';
import {Love} from '../model/love';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionList: Question[] = [];
  page = 1;
  imageHost = Consts.IMAGE_HOST;
  faHeart = faHeart;
  faPlus = faPlus;
  faBars = faBars;

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar,
              private toastr: ToastrService, private loveService: LoveService) {
  }

  ngOnInit() {
    this.nextPage();
  }

  zan(question: Question) {
    const love = new Love();
    love.id = question.id;
    love.type = 2;
    love.category = 0;
    love.loveNumber = 1;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，点赞成功！');
        question.loveNumber++;
      }
    });
  }

  focus(question: Question) {
    const love = new Love();
    love.id = question.id;
    love.type = 2;
    love.category = 2;
    love.focusNumber = 1;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，关注成功！');
        question.focusNumber++;
      }
    });
  }

  nextPage() {
    const question = new Question();
    question.page = this.page;
    this.questionService.list(question).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        if (jsonBean.data === undefined || jsonBean.data === null || jsonBean.data.length === 0) {
          this.snackBar.open('没有更多问题了，亲！', null, {duration: 2000});
        } else {
          // 改为显示所有数据
          jsonBean.data.forEach(val => this.questionList.push(val));
          // this.questionList = jsonBean.data;
          this.page++;
        }
      } else {
        this.snackBar.open(jsonBean.message, null, {duration: 2000});
      }
    });
  }
}
