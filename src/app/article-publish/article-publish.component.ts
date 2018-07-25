import {Component, OnInit} from '@angular/core';
import {Article} from '../model/article';
import {ArticleService} from '../service/article.service';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {ToastrService} from 'ngx-toastr';

import * as $ from 'jquery';

@Component({
  selector: 'app-article-publish',
  templateUrl: './article-publish.component.html',
  styleUrls: ['./article-publish.component.css']
})
export class ArticlePublishComponent implements OnInit {
  article: Article = new Article();
  option: Object = null;
  ids: string[] = [];

  constructor(private articleService: ArticleService,
              private tokenStorage: TokenStorage, private toastr: ToastrService) {

  }

  ngOnInit() {
    // 在事件中要使用外部的this,因为函数内部也有this所以讲this的值赋给that
    const that = this;
    // 参数配置
    // https://www.froala.com/wysiwyg-editor/docs/options?utm_expid=98676916-2.gb-QgBReTCCS2F60oBIe_g.0
    // &utm_referrer=https%3A%2F%2Fwww.google.com%2F#language
    this.option = {
      language: 'zh_cn', // 配置语言
      placeholderText: '条理清晰的文章内容，好内容才会有人付费阅读', // 文本框提示内容
      charCounterCount: true, // 是否开启统计字数
      // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
      // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
      toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'insertLink', 'insertImage',
        'insertHR', 'insertTable', '|', 'quote', 'paragraphFormat', 'formatOL', 'formatUL', 'align', '|', 'color', 'clearFormatting',
        'undo', 'redo', 'html'],
      codeMirror: false, // 高亮显示html代码
      codeMirrorOptions: { // 配置html代码参数
        tabSize: 4
      },
      // 选择图片的按钮，去掉管理图片
      imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
      // 上传图片，视频等稳健配置
      imageUploadURL: Consts.URL + 'article/upload', // 文件上传接口名称
      requestHeaders: {'userId': this.tokenStorage.getUserId()},
      imageUploadParams: {'tokenId': this.tokenStorage.getToken()}, // 接口其他传参,默认为空对象{},
      imageUploadMethod: 'POST', // POST/GET,
      // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
      events: {
        'froalaEditor.image.inserted': function (e, editor, image, response) {
          // image已经是一个jQuery对象，不需要$重新选中
          image.removeAttr('style');
          image.removeClass();
          image.addClass('img-fluid');
          const obj = JSON.parse(response);
          that.ids.push(obj.data[0].name);
        },
        'froalaEditor.table.inserted': function (e, editor, table) {
          // 插入的表格没有样式，因为bootstrap的问题，没有显示出来
          // table 是一个html dom对象，需要jQuery选中一下
          $(table).addClass('table table-bordered');
        }
      }
    };
    const account = this.tokenStorage.getAccount();
    if (account === null || account === undefined) {
      this.toastr.success('发表文章必须要先登录哦，亲！', '温馨提示');
    }
  }

  public submit() {
    if (this.article.title === null) {
      this.toastr.info('文章标题不能为空。');
      return;
    }
    if (this.article.content === null) {
      this.toastr.info('文章内容不能为空。');
      return;
    }
    this.article.authorId = this.tokenStorage.getUserId();
    this.article.authorName = this.tokenStorage.getAccount();
    this.article.ids = this.ids;
    this.article.firstFree = true;
    this.articleService.save(this.article).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        // 利用双向绑定，reset form
        this.article = new Article();
        this.toastr.success('发表文章成功，亲。');
      } else {
        let message = jsonBean.message;
        if (message === null) {
          message = '文章保存失败。';
        }
        this.toastr.info(message);
      }
    });
  }
}
