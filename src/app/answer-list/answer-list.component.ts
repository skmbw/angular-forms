import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../service/message.service';
import {faCheck, faCommentDots, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Love} from '../model/love';
import {LoveService} from '../service/love.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorage} from '../token/token.storage';
import {QuestionService} from '../service/question.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent extends BaseComponent implements OnInit {
  @Input()
  questionId: string;
  @Input()
  asker: string;
  faHeart = faHeart;
  faPlus = faPlus;
  faCheck = faCheck;
  faCommentDots = faCommentDots;
  answerList: Answer[] = [];
  imageHost = Consts.IMAGE_HOST;
  userId = null;

  constructor(private answerService: AnswerService, snackBar: MatSnackBar, private router: ActivatedRoute,
              private messageService: MessageService, private loveService: LoveService,
              private toastr: ToastrService, private tokenStorage: TokenStorage,
              private questionService: QuestionService) {
    super(snackBar);
    this.userId = this.tokenStorage.getUserId();
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

  zan(answer: Answer) {
    const love = new Love();
    love.id = answer.id;
    love.type = 3;
    love.category = 0;
    love.loveNumber = 1;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，点赞成功！');
        answer.loveNumber++;
      }
    });
  }

  focus(answer: Answer) {
    const love = new Love();
    love.id = answer.id;
    love.type = 3;
    love.category = 2;
    love.focusNumber = 1;
    if (answer.content.length > 100) {
      love.remark = answer.content.substring(0, 99);
    } else {
      love.remark = answer.content;
    }
    love.name = answer.questionId; // 答案所关联的问题
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，关注成功！');
        answer.focusNumber++;
      }
    });
  }

  setupRightAnswer(answer: Answer) {
    const params = new Answer();
    params.ownerId = this.userId;
    params.questionId = answer.questionId;
    params.answerUserId = answer.answerUserId;
    params.id = answer.id;
    this.questionService.saveRightAnswer(params).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('设置最佳答案成功，亲！');
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }

  reply(answer: Answer) {
  }
}
