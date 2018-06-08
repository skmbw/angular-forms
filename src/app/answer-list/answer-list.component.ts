import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent extends BaseComponent implements OnInit {
  @Input()
  questionId: string; // 这个参数在哪个生命周期方法中能够取到？页面显示是OK的

  answerList: Answer[] = [];

  imageHost = Consts.IMAGE_HOST;

  constructor(private answerService: AnswerService, private snackBar: MatSnackBar, private router: ActivatedRoute) {
    super(snackBar);
  }

  ngOnInit() {
    const param: Answer = new Answer();
    // TODO 这个时候，还没有拿到@input绑定的数据，从路由里面取数据吧
    param.questionId = this.router.snapshot.paramMap.get('id');
    this.answerService.list(param).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answerList = jsonBean.data;
        for (const answer of this.answerList) {
          answer.content = answer.content.replace('localhost:8300/', Consts.IMAGE_URL)
            .replace('{{image.server}}', Consts.IMAGE_URL);
        }
      } else {
        this.alert(jsonBean.message);
      }
    });
  }
}
