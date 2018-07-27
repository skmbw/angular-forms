import {Component, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {MatSnackBar} from '@angular/material';
import {QuestionService} from '../service/question.service';
import {BaseComponent} from '../common/base.component';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent extends BaseComponent implements OnInit {
  question = new Question();
  ids: string[] = [];
  option: Object = null;

  constructor(private questionService: QuestionService, snackBar: MatSnackBar,
              private tokenStorage: TokenStorage, private toastr: ToastrService,
              private router: ActivatedRoute) {
    super(snackBar);
    const account = this.tokenStorage.getAccount();
    if (account === null || account === undefined) {
      this.toastr.success('提问前必须要先登录哦，亲！', '温馨提示');
    }
  }

  ngOnInit() {
    const that = this;
    this.option = {
      language: 'zh_cn', // 配置语言
      placeholderText: '问题的背景，前置条件，以及详细描述。精确的描述更易得到回答。', // 文本框提示内容
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
      // 选择图片的按钮，去掉管理图片
      // imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL', 'imageManager'],
      imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
      linkList: [], // 默认有Google，Facebook，froala，去掉他们
      // 上传图片，视频等配置
      imageUploadURL: Consts.URL + 'question/upload', // 文件上传接口名称
      // imageUploadFileName: 'imageList[0]', // 默认是file
      requestHeaders: {'userId': this.tokenStorage.getUserId()},
      imageUploadParams: {'tokenId': this.tokenStorage.getToken()}, // 接口其他传参,默认为空对象{},
      imageUploadMethod: 'POST',
      // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
      events: {
        'froalaEditor.image.inserted': function (e, editor, $img, response) {
          $img.removeAttr('style');
          $img.removeClass();
          $img.addClass('img-fluid');
          const obj = JSON.parse(response);
          // 闭包作用域
          that.ids.push(obj.data[0].name);
        },
        'froalaEditor.table.inserted': function (e, editor, table) {
          // 插入的表格没有样式，因为bootstrap的问题，没有显示出来
          // table 是一个html dom对象，需要jQuery选中一下
          $(table).addClass('table table-bordered');
        }
      }
    };
    const questionId = this.router.snapshot.queryParams['id'];
    if (questionId !== undefined) {
      this.questionService.detail(questionId).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.question = jsonBean.data;
        }
      });
    }
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
    this.question.account = this.tokenStorage.getAccount();
    this.question.userId = this.tokenStorage.getUserId();
    this.question.terminal = 1;
    this.question.ids = this.ids;
    this.questionService.save(this.question).subscribe(result => {
      if (result.code === 1) {
        // angular的双向绑定，重新赋值，可以清空表单
        this.question = new Question();
        this.toastr.success('恭喜你，提问成功，亲！');
      } else {
        this.toastr.info(result.message);
      }
    });
  }
}
