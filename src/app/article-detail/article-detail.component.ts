import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Consts} from '../common/consts';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {TokenStorage} from '../token/token.storage';
import {BaseComponent} from '../common/base.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent extends BaseComponent implements OnInit {
  article: Article = new Article(); // template中要显示，需要初始化，否则会找不到属性
  content: any;
  comment: Comment = new Comment();
  id: string = null;

  constructor(private articleService: ArticleService, snackBar: MatSnackBar,
              private router: ActivatedRoute, private sanitizer: DomSanitizer,
              private commentService: CommentService, private tokenStorage: TokenStorage) {
    super(snackBar);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      // 这里先赋值，否则子组件绑定的时候，@input拿不到值
      this.article.id = this.id;
      this.articleService.detail(this.id).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.article = jsonBean.data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.article.content.replace('{{image.server}}', Consts.IMAGE_URL));
          // this.content = this.article.content.replace('{{image.server}}', Consts.IMAGE_URL); // 这个貌似也是可以的？
        } else {
          this.snackBar.open('文章不存在，亲！', '确定', {
            duration: 2000,
          });
        }
      });
    });
  }

  public addComment() {
    if (this.comment.content === null || this.comment.content.trim() === '') {
      this.snackBar.open('吐槽不能为空啊，亲！', null, {
        duration: 2000,
      });
      return;
    }
    // alert(this.comment);
    this.comment.articleId = this.id;
    this.comment.userId = this.tokenStorage.getUserId();
    this.comment.nickName = this.tokenStorage.getAccount();
    this.commentService.save(this.comment).subscribe(value => {
      if (value.code = 1) {
        this.comment = new Comment();
        this.alert('评论成功！亲');
      } else {
        this.snackBar.open(value.message, '', {duration: 2000});
      }
    });
  }
}
