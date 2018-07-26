import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../service/message.service';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';
import {Consts} from '../common/consts';
import {Dialogue} from '../model/dialogue';

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
      const answer = new Answer();
      const dialog = msg.text;
      answer.content = dialog.content;
      this.dialogList.push(answer);
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
