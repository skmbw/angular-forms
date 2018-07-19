import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {ToastrService} from 'ngx-toastr';
import {Consts} from '../common/consts';
import {Question} from '../model/question';
import {faBars} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private questionService: QuestionService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.questionService.list({}).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.questionList = jsonBean.data;
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }

}
