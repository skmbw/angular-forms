import {Component, OnInit} from '@angular/core';
import {Article} from '../model/article';
import {MatSnackBar} from '@angular/material';
import {ArticleService} from '../service/article.service';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Component({
  selector: 'app-article-publish',
  templateUrl: './article-publish.component.html',
  styleUrls: ['./article-publish.component.css']
})
export class ArticlePublishComponent implements OnInit {
  content: string = null;
  article: Article = new Article();
  option: Object = null;

  constructor(private snackBar: MatSnackBar, private articleService: ArticleService, private tokenStorage: TokenStorage) {

  }

  ngOnInit() {
    // 在事件中要使用外部的this,因为函数内部也有this所以讲this的值赋给that
    const that = this;
    // 参数配置
    // https://www.froala.com/wysiwyg-editor/docs/options?utm_expid=98676916-2.gb-QgBReTCCS2F60oBIe_g.0
    // &utm_referrer=https%3A%2F%2Fwww.google.com%2F#language
    this.option = {
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
      // 上传图片，视频等稳健配置
      imageUploadURL: Consts.URL + 'article/upload', // 文件上传接口名称
      // imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//本地路径
      imageUploadParams: {'tokenId': this.tokenStorage.getToken()}, // 接口其他传参,默认为空对象{},
      imageUploadMethod: 'POST', // POST/GET,
      // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
      events: {
        'froalaEditor.keyup': function (e, editor) {
          // that.froala.emit(that.froalaText);
          // console.log(editor.selection.get());
        },
        'froalaEditor.image.inserted': function (e, editor, $img, response) {
          // console.log('froalaEditor.image.inserted');
          $img.removeAttr('style');
          $img.removeClass();
          $img.addClass('img-fluid');
        }
        // ,
        // 'froalaEditor.image.uploaded': function (e, editor, response) {
        //   console.log('froalaEditor.image.uploaded');
        //   // const obj = JSON.parse(response);
        //   // const host = obj.link;
        //   // response.link = Consts.IMAGE_HOST + host;
        //   // response = {'link': response.data.url};
        //   return true;
        // }
      }
    };
  }

  public submit() {
    if (this.article.title === null) {
      this.snackBar.open('文章标题不能为空。', null, {duration: 2000});
      return;
    }
    if (this.article.content === null) {
      this.snackBar.open('文章内容不能为空。', null, {duration: 2000});
      return;
    }
  }
}
