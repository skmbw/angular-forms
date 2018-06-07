import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input()
  questionId: string = null;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
  }

}
