import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../service/question.service';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {Question} from '../model/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent extends BaseComponent implements OnInit {
  question: Question = new Question();
  content: any;

  constructor(private questionService: QuestionService, private router: ActivatedRoute,
              private sanitizer: DomSanitizer, snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.questionService.detail(id).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.question = jsonBean.data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.question.content.replace('{{image.server}}', Consts.IMAGE_URL));
        } else {
          this.alert('问题不存在，亲！');
        }
      });
    });
  }

}
