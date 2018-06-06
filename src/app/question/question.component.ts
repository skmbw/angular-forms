import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {Question} from '../model/question';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionList: Question[] = [];
  page = 1;
  imageHost = Consts.IMAGE_HOST;
  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.questionService.list({}).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.questionList = jsonBean.data;
      } else {
        this.snackBar.open(jsonBean.message, null, {duration: 2000});
      }
    });
  }

}
