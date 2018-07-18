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
import {MatSnackBar} from '@angular/material';
import {MessageService} from '../service/message.service';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {DomSanitizer} from '@angular/platform-browser';
import {LoveService} from '../service/love.service';
import {FocusService} from '../service/focus.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  // 注入DomSanitizer然后使用bypassSecurityTrustHtml转换html内容，这样就能显示html了
  // Inject AngularMasonryComponent instance from template
  @ViewChild(AngularMasonryComponent) masonry: AngularMasonryComponent;
  // columnTop: string;
  articleList: Article[] = [];
  jsonBean: JsonBean = {};
  // bricks: any[] = [];
  page = 0;
  // userName: string;
  subscription: Subscription;
  faHeart = faHeart;
  faPlus = faPlus;
  // Options
  options: MasonryOptions = {
    transitionDuration: '0.3s'
  };
  // ObservableMedia 并不是真正意义上的 Observable. 它仅仅是一个被用来暴露额外方法 如 isActive()的外壳。
  // 用.asObservable() 来转换成Observable，然后就可以用RxJs操作符了 如such as media.asObservable().filter(….).
  // constructor(media: ObservableMedia, private articleService: ArticleService, private snackBar: MatSnackBar) {
  //   media.asObservable()
  //     .pipe(
  //       filter((change: MediaChange) => change.mqAlias === 'xs')
  //     ).subscribe(() => this.loadMobileContent());
  // }

  constructor(private articleService: ArticleService, private snackBar: MatSnackBar,
              private messageService: MessageService, private sanitizer: DomSanitizer,
              private loveService: LoveService, private focusService: FocusService) {
    // media.asObservable()
    //   .pipe(
    //     filter((change: MediaChange) => change.mqAlias === 'xs')
    //   ).subscribe(() => this.loadMobileContent());
    this.subscription = this.messageService.getMessage().subscribe(message => {
      // this.articleList.push(null);
      // 这里执行查询操作，然后刷新瀑布流
      // console.log('收到数据' + message.text.toString());
    });
  }

  // 监听布局的变化，重新加载内容
  // loadMobileContent() {
  // console.log('loadMobileContent');
  // }

  ngAfterViewInit() {
    this.masonry.layoutComplete.subscribe(() => {
      // console.log('layout');
    });
  }

  remove(brick) {
    // this.bricks.splice(this.bricks.indexOf(brick), 1);
    this.articleList.splice(this.articleList.indexOf(brick), 1);
  }

  zan(article: Article) {
    this.loveService.save(article.id, '1');
  }

  focus(article: Article) {
    this.focusService.save(article.id, '1');
  }

  ngOnInit() {
    // this.columnTop = '0';
    // fromEvent(window, 'scroll').subscribe((event) => {
    //   this.onWindowScroll();
    // });

    // 初始化
    this.articleService.list(this.page).subscribe(articles => {
      this.jsonBean = articles;
      // console.log(this.articleList.length);
      this.buildBricks();
    });
  }

  onWindowScroll() {
    if (this.getScrollTop() + this.getClientHeight() === this.getScrollHeight()) {
      // console.log('滚动到底部');
      this.articleService.list(this.page).subscribe(articles => {
        this.jsonBean = articles;

        if (this.jsonBean.code !== 1) {
          // console.log('没有更多数据了。');
          this.snackBar.open('没有更多数据了，亲！', '确定', {
            duration: 2000,
          });
        } else {
          this.buildBricks();
          this.page++;
          // console.log(this.page);
        }
      });
    }
  }

  private buildBricks() {
    // const articleList: Article[] = [this.jsonBean.data];
    for (const article of this.jsonBean.data) {
      // const brick: Brick = new Brick();
      const brick: Article = new Article();
      brick.summary = this.sanitizer.bypassSecurityTrustHtml(article.summary);
      brick.id = article.id;
      const fileList = article.fileList;
      if (fileList !== undefined && fileList !== null) {
        const img: ImageFile = fileList[0];
        brick.image = Consts.IMAGE_HOST + img.filePath + img.type;
      }
      // this.bricks.push(brick);
      this.articleList.push(brick);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMore() {
    this.articleService.list(this.page).subscribe(articles => {
      this.jsonBean = articles;

      if (this.jsonBean.code !== 1) {
        // console.log('没有更多数据了。');
        this.snackBar.open('没有更多数据了，亲！', '确定', {
          duration: 2000,
        });
      } else {
        this.buildBricks();
        this.page++;
        // console.log(this.page);
      }
    });
  }

  // 获取滚动条当前的位置
  getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  // 获取当前可是范围的高度
  getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = Math.min(document.body.clientHeight,
        document.documentElement.clientHeight);
    } else {
      clientHeight = Math.max(document.body.clientHeight,
        document.documentElement.clientHeight);
    }
    return clientHeight;
  }

  // 获取文档完整的高度
  getScrollHeight() {
    return Math.max(document.body.scrollHeight,
      document.documentElement.scrollHeight);
  }
}
