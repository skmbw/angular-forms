import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MasonryOptions} from '../masonry/masonry-options';
import {AngularMasonryComponent} from '../masonry/masonry.component';
// import {MediaChange, ObservableMedia} from '@angular/flex-layout';
// import {fromEvent, Subscription} from 'rxjs';
import {Subscription} from 'rxjs';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {ImageFile} from '../model/image-file';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageService} from '../service/message.service';
import {faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {DomSanitizer} from '@angular/platform-browser';
import {LoveService} from '../service/love.service';
import {Love} from '../model/love';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(AngularMasonryComponent) masonry: AngularMasonryComponent;
  articleList: Article[] = [];
  jsonBean: JsonBean = {};
  page = 1;
  subscription: Subscription;
  faHeart = faHeart;
  faPlus = faPlus;
  options: MasonryOptions = {
    transitionDuration: '0.3s'
  };

  constructor(private articleService: ArticleService, private snackBar: MatSnackBar,
              private messageService: MessageService, private sanitizer: DomSanitizer,
              private loveService: LoveService, private toastr: ToastrService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      // 这里执行查询操作，然后刷新瀑布流
    });
  }

  ngAfterViewInit() {
    this.masonry.layoutComplete.subscribe(() => {
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

  ngOnInit() {
    this.loadMore();
  }

  private buildBricks() {
    for (const article of this.jsonBean.data) {
      const brick: Article = new Article();
      brick.summary = this.sanitizer.bypassSecurityTrustHtml(article.summary);
      brick.id = article.id;
      brick.loveNumber = article.loveNumber;
      brick.focusNumber = article.focusNumber;
      const fileList = article.fileList;
      if (fileList !== undefined && fileList !== null) {
        const img: ImageFile = fileList[0];
        brick.image = Consts.IMAGE_HOST + img.filePath + img.type;
      }
      this.articleList.push(brick);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMore() {
    const article = new Article();
    article.page = this.page;
    article.pageSize = 20;
    this.articleService.list(article).subscribe(articles => {
      this.jsonBean = articles;

      if (this.jsonBean.code !== 1) {
        this.snackBar.open('没有更多数据了，亲！', '确定', {
          duration: 2000,
        });
      } else {
        this.buildBricks();
        this.page++;
      }
    });
  }
}
