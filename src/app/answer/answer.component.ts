import {Component, Input, OnInit} from '@angular/core';
import {Consts} from '../common/consts';
import {MatSnackBar} from '@angular/material';
import {TokenStorage} from '../token/token.storage';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';
import {BaseComponent} from '../common/base.component';

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
    placeholderText: '请输入内容', // 文本框提示内容
    charCounterCount: true, // 是否开启统计字数
    // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
    // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
    toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'align', 'insertLink', 'insertImage',
      'insertHR', 'subscript', 'superscript'],
    codeMirror: false, // 高亮显示html代码
    codeMirrorOptions: { // 配置html代码参数
      tabSize: 4
    },
    // 上传图片，视频等配置
    imageUploadURL: Consts.URL + 'question/upload', // 文件上传接口名称
    imageUploadParams: {'tokenId': this.tokenStorage.getToken()}, // 接口其他传参,默认为空对象{},
    imageUploadMethod: 'POST',
    // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
    events: {
      'froalaEditor.image.inserted': function (e, editor, $img, response) {
        // console.log('froalaEditor.image.inserted');
        $img.removeAttr('style');
        // const src = Consts.IMAGE_HOST + $img.attr('src');
        // $img.attr('src', src);
        $img.removeClass();
        $img.addClass('img-fluid');
      }
    }
  };
  answer: Answer = new Answer();

  constructor(private snackBar: MatSnackBar, private tokenStorage: TokenStorage, private answerService: AnswerService) {
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

    this.answerService.save(this.answer).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.alert('回答成功！');
      } else {
        this.alert(jsonBean.message);
      }
    });
  }
}
