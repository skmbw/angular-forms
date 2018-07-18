import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent extends BaseComponent implements OnInit {
  @Input()
  questionId: string;

  answerList: Answer[] = [];

  imageHost = Consts.IMAGE_HOST;

  constructor(private answerService: AnswerService, snackBar: MatSnackBar, private router: ActivatedRoute,
              private messageService: MessageService) {
    super(snackBar);
  }

  ngOnInit() {
    const param: Answer = new Answer();
    // 这个时候，还没有拿到@input绑定的数据，从路由里面取数据吧
    // 已经可以拿到数据了，是因为父组件是在回调中赋值的，时间上晚了，已经更改
    // param.questionId = this.router.snapshot.paramMap.get('id');
    param.questionId = this.questionId;
    this.answerService.list(param).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answerList = jsonBean.data;
        for (const answer of this.answerList) {
          answer.content = answer.content.replace('localhost:8300/', Consts.IMAGE_URL)
            .replace('{{image.server}}', Consts.IMAGE_URL);
        }
      } else {
        this.alert('还没有人回答，赶紧去抢答！');
      }
    });

    // 接收回答的消息，并添加到list尾部
    this.messageService.getAnswer().subscribe(message => {
      const answer: Answer = new Answer();
      const msg = message.text;
      // 如果不复制一次，源头对象修改，这里也会被修改。比如情况输入框，这里就被清空了，原因是angular的双向绑定。
      answer.nickName = msg.nickName;
      answer.answerDate = msg.answerDate;
      answer.avatar = msg.avatar;
      answer.content = msg.content;
      answer.content = answer.content.replace('localhost:8300/', Consts.IMAGE_URL)
        .replace('{{image.server}}', Consts.IMAGE_URL);

      this.answerList.push(answer);
    });
  }
}
