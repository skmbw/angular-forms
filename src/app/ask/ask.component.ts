import {Component, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {MatSnackBar} from '@angular/material';
import {QuestionService} from '../service/question.service';
import {BaseComponent} from '../common/base.component';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent extends BaseComponent implements OnInit {
  question = new Question();
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
    imageUploadFileName: 'imageList[0]',
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

  constructor(private questionService: QuestionService, snackBar: MatSnackBar, private tokenStorage: TokenStorage) {
    super(snackBar);
  }

  ngOnInit() {
  }

  public submit() {
    if (this.question.title === null || this.question.title.trim() === '') {
      this.alert('问题标题不能为空，亲！');
      return;
    }
    if (this.question.content === null || this.question.content.trim() === '') {
      this.alert('问题内容不能为空，亲！');
      return;
    }
    if (this.question.category === null) {
      this.alert('请选择问题分类，亲！');
      return;
    }
    if (this.question.serviceType === null) {
      this.alert('请选择服务方式，亲！');
      return;
    }
    if (this.question.serviceType !== 3 && this.question.price === null) {
      this.alert('请填写问题赏金，亲！');
      return;
    }
    this.questionService.save(this.question).subscribe(result => {
      if (result.code === 1) {
        this.alert('提问成功，亲！');
      } else {
        this.alert(result.message);
      }
    });
  }
}
