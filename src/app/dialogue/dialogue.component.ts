import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../service/message.service';
import {AnswerService} from '../service/answer.service';
import {Consts} from '../common/consts';
import {Dialogue} from '../model/dialogue';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() answerId = null;
  imageHost = Consts.IMAGE_HOST;
  dialogList: Dialogue[] = [];
  style = null;

  constructor(private messageService: MessageService, private answerService: AnswerService) {
  }

  ngOnInit() {
    this.messageService.getDialogue().subscribe(msg => {
      const dialog = new Dialogue();
      const asw = msg.text;
      if (this.answerId === asw.targetId) {
        dialog.content = asw.content;
        dialog.dialogDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'zh');
        dialog.nickName = asw.nickName;
        dialog.userId = asw.answerUserId;
        this.dialogList.push(dialog);
      }
    });
  }

  loadDetail() {
    const params = new Dialogue();
    params.answerId = this.answerId;
    this.answerService.detailList(params).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.dialogList = jsonBean.data;
        this.style = {'display': 'none'};
      }
    });
  }
}
