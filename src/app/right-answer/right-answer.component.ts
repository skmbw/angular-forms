import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {Consts} from '../common/consts';

@Component({
  selector: 'app-right-answer',
  templateUrl: './right-answer.component.html',
  styleUrls: ['./right-answer.component.css']
})
export class RightAnswerComponent implements OnInit {
  @Input()
  questionId = null;
  @Input()
  answer: Answer = null;
  imageHost = Consts.IMAGE_HOST;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.getQuestionAnswer(this.questionId).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answer = jsonBean.data;
      }
    });
  }

}
