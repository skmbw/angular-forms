import {Component, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {MatSnackBar} from '@angular/material';
import {QuestionService} from '../service/question.service';
import {BaseComponent} from '../common/base.component';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent extends BaseComponent implements OnInit {
  question = new Question();

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
  }

  public submit() {
    if (this.question.title === null || this.question.title.trim() === '') {
      this.alert('问题标题不能为空，亲！');
      return;
    }
    if (this.question.content === null || this.question.content.trim() === '') {
      this.alert('问题内容不能为空，亲！');
      return;
    }
    if (this.question.category === null) {
      this.alert('请选择问题分类，亲！');
      return;
    }
    if (this.question.serviceType === null) {
      this.alert('请选择服务方式，亲！');
      return;
    }
    if (this.question.serviceType !== 3 && this.question.price === null) {
      this.alert('请填写问题赏金，亲！');
      return;
    }
    this.questionService.save(this.question).subscribe(result => {
      if (result.code === 1) {
        this.alert('提问成功，亲！');
      } else {
        this.alert(result.message);
      }
    });
  }
}
