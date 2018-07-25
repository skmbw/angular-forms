import {Component, Input, OnInit} from '@angular/core';
import {Consts} from '../common/consts';
import {MatSnackBar} from '@angular/material';
import {TokenStorage} from '../token/token.storage';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';
import {BaseComponent} from '../common/base.component';
import {MessageService} from '../service/message.service';
import {formatDate} from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent extends BaseComponent implements OnInit {
  @Input()
  questionId: string = null;
  option = {
    language: 'zh_cn', // 配置语言
    placeholderText: '回答内容，针对题主描述，详尽回答', // 文本框提示内容
    charCounterCount: true, // 是否开启统计字数
    // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
    // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
    toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'align', 'insertLink', 'insertImage',
      'insertHR', 'insertTable', '|', 'quote', 'paragraphFormat', 'formatOL', 'formatUL', 'align', '|', 'color', 'clearFormatting',
      'undo', 'redo', 'html'],
    codeMirror: false, // 高亮显示html代码
    codeMirrorOptions: { // 配置html代码参数
      tabSize: 4
    },
    // 上传图片，视频等配置
    imageUploadURL: Consts.URL + 'answer/upload', // 文件上传接口名称
    // imageUploadFileName: 'imageList[0]',
    requestHeaders: {'userId': this.tokenStorage.getUserId()},
    imageUploadParams: {'tokenId': this.tokenStorage.getToken()}, // 接口其他传参,默认为空对象{},
    imageUploadMethod: 'POST',
    // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
    events: {
      'froalaEditor.image.inserted': function (e, editor, $img, response) {
        $img.removeAttr('style');
        $img.removeClass();
        $img.addClass('img-fluid');
      },
      'froalaEditor.table.inserted': function (e, editor, table) {
        // 插入的表格没有样式，因为bootstrap的问题，没有显示出来
        // table 是一个html dom对象，需要jQuery选中一下
        $(table).addClass('table table-bordered');
      }
    }
  };
  answer: Answer = new Answer();

  constructor(snackBar: MatSnackBar, private tokenStorage: TokenStorage, private answerService: AnswerService,
              private messageService: MessageService) {
    super(snackBar);
  }

  ngOnInit() {
  }

  submit() {
    const c = this.answer.content;
    if (c === null || c.trim() === '') {
      this.alert('回答内容不能为空，亲。');
      return;
    }
    this.answer.questionId = this.questionId;
    this.answer.targetId = this.questionId;
    this.answer.answerUserId = this.tokenStorage.getUserId();

    this.answerService.save(this.answer).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.answer.avatar = '/img/avatar/' + this.answer.answerUserId + '.jpeg';
        this.answer.answerDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'zh');
        this.answer.nickName = this.tokenStorage.getAccount();
        this.messageService.sendAnswer(this.answer);
        this.answer.content = null;
        this.alert('回答成功！');
      } else {
        this.alert(jsonBean.message);
      }
    });
  }
}
