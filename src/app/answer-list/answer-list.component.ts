import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent extends BaseComponent implements OnInit {
  @Input()
  questionId: string = null;

  answerList: Answer[] = [];

  imageHost = Consts.IMAGE_HOST;

  constructor(private answerService: AnswerService, private snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
    const param: Answer = new Answer();
    param.questionId = this.questionId;
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
