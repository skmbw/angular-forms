import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Consts} from '../common/consts';
import {CommentService} from '../service/comment.service';
import {Comment} from '../model/comment';
import {TokenStorage} from '../token/token.storage';
import {BaseComponent} from '../common/base.component';
import {MessageService} from '../service/message.service';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Love} from '../model/love';
import {LoveService} from '../service/love.service';
import {faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {request} from './bundle';
import GrpcRequest = request.GrpcRequest;

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
  faHeart = faHeart;
  faPlus = faPlus;

  constructor(private articleService: ArticleService, snackBar: MatSnackBar,
              private router: ActivatedRoute, private sanitizer: DomSanitizer,
              private commentService: CommentService, private tokenStorage: TokenStorage,
              private messageService: MessageService, private toastr: ToastrService,
              private loveService: LoveService) {
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
          this.toastr.warning('文章不存在，亲！');
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
        this.comment.commentDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'zh');
        this.messageService.sendComment(this.comment);
        this.comment = new Comment();
        this.toastr.success('吐槽成功啊！亲');
      } else {
        this.snackBar.open(value.message, '', {duration: 2000});
      }
    });
  }

  zan(article: Article) {
    const love = new Love();
    love.id = article.id;
    love.type = 1;
    love.category = 0;
    love.loveNumber = 1;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，点赞成功！');
        article.loveNumber++;
      }
    });
  }

  focus(article: Article) {
    const love = new Love();
    love.id = article.id;
    love.type = 1;
    love.category = 2;
    love.focusNumber = 1;
    love.remark = article.title;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，关注成功！');
        article.focusNumber++;
      }
    });
  }

  protobuf() {
    const req = GrpcRequest.fromObject({'name': '尹磊'});
    this.articleService.grpc(req).subscribe(result => {
      console.log(result);
      const byte = new Uint8Array(result, 0, result.byteLength);
      const r = GrpcRequest.decode(byte);
      console.log(r);
    });
  }
}
