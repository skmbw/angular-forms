import {Component, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {
  answerList: Answer[] = [];
  imageHost = Consts.IMAGE_HOST;

  constructor(private answerService: AnswerService, private tokenStorage: TokenStorage) {
  }

  ngOnInit() {
    const param: Answer = new Answer();
    param.answerUserId = this.tokenStorage.getUserId();
    this.answerService.list(param).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answerList = jsonBean.data;
        for (const answer of this.answerList) {
          answer.content = answer.content.replace('localhost:8300/', Consts.IMAGE_URL)
            .replace('{{image.server}}', Consts.IMAGE_URL);
        }
      } else {
        // this.alert('还没有人回答，赶紧去抢答！');
      }
    });
  }

}
