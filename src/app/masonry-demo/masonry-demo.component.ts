import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MasonryOptions} from '../masonry/masonry-options';
import {AngularMasonryComponent} from '../masonry/masonry.component';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {filter} from 'rxjs/operators/filter';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {Brick} from '../model/brick';
import {ImageFile} from '../model/image-file';

@Component({
  selector: 'app-masonry-demo',
  templateUrl: './masonry-demo.component.html',
  styleUrls: ['./masonry-demo.component.css']
})
export class MasonryDemoComponent implements OnInit, AfterViewInit {

  // Inject AngularMasonryComponent instance from template
  @ViewChild(AngularMasonryComponent) masonry: AngularMasonryComponent;
  columnTop: string;
  articleList: Article[] = [];
  jsonBean: JsonBean = {};
  bricks: any[] = [];
  page = 0;

  // Options
  options: MasonryOptions = {
    transitionDuration: '0.3s'
  };
  // ObservableMedia 并不是真正意义上的 Observable. 它仅仅是一个被用来暴露额外方法 如 isActive()的外壳。
  // 用.asObservable() 来转换成Observable，然后就可以用RxJs操作符了 如such as media.asObservable().filter(….).
  constructor(media: ObservableMedia, private articleService: ArticleService) {
    media.asObservable()
      .pipe(
        filter((change: MediaChange) => change.mqAlias === 'xs')
      ).subscribe(() => this.loadMobileContent());
  }

  // 监听布局的变化，重新加载内容
  loadMobileContent() {
    console.log('loadMobileContent');
  }

  ngAfterViewInit() {
    this.masonry.layoutComplete.subscribe(() => {
      console.log('layout');
    });

    // this.bricks.push({ id: 4, image: 'http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg' });
    // this.articleService.list().subscribe(articles => this.jsonBean = articles);
    // for (const article of this.jsonBean.data) {
    //   this.bricks.push(article.title);
    // }
  }

  addText() {
    const lorem = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at tortor eu lacus imperdiet volutpat.' +
      ' Aliquam erat volutpat. Integer et.',
      'orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper sit amet felis malesuada accumsan.' +
      ' Quisque sed fermentum justo. Vestibulum maximus diam condimentum elit placerat cursus. Vivamus ac eros vulputate,' +
      ' lobortis felis vel, ultricies dolor. Donec in eros sit amet lorem pretium rutrum. Vestibulum viverra, ' +
      'nisl volutpat maximus malesuada, ex.'
    ];

    const index = Math.floor(Math.random() * lorem.length);

    this.bricks.push({text: lorem[index]});
  }

  addImage() {
    const lorem = [
      'http://www.zhlzw.com/UploadFiles/Article_UploadFiles/201204/20120412123916285.jpg',
      'http://pics.sc.chinaz.com/files/pic/pic9/201804/bpic6470.jpg',
      'https://t10.baidu.com/it/u=3626816463,364440236&fm=173&app=25&f=JPEG?w=640&h=960&s=B6136223474241558438FFF90300C035',
      'http://img.taopic.com/uploads/allimg/121115/240487-12111520035993.jpg',
      'http://pics.sc.chinaz.com/files/pic/pic9/201803/bpic6258.jpg',
      'http://pics.sc.chinaz.com/files/pic/pic9/201803/bpic6314.jpg'
    ];

    const index = Math.floor(Math.random() * lorem.length);

    this.bricks.push({image: lorem[index]});
  }

  remove(brick) {
    this.bricks.splice(this.bricks.indexOf(brick), 1);
  }

  ngOnInit() {
    this.columnTop = '0';
    fromEvent(window, 'scroll').subscribe((event) => {
      this.onWindowScroll();
    });

    // 初始化
    this.articleService.list(this.page).subscribe(articles => {
      this.jsonBean = articles;
      // console.log(this.articleList.length);
      this.buildBricks();
    });
  }

  onWindowScroll() {
    // this.columnTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) + 'px';
    if (this.getScrollTop() + this.getClientHeight() === this.getScrollHeight()) {
      console.log('滚动到底部');
      // this.addImage();
      // this.addText();
      // this.addImage();
      // this.addText();
      // this.addImage();
      // this.addText();
      this.articleService.list(this.page).subscribe(articles => {
        this.jsonBean = articles;
        // console.log(this.articleList.length);
        // for (const article of this.jsonBean.data) {
        //   this.bricks.push({text: article.title + article.summary});
        // }
        this.buildBricks();
        this.page++;
        console.log(this.page);
      });
    }
  }

  private buildBricks() {
    for (const article of this.jsonBean.data) {
      const brick: Brick = new Brick();
      brick.text = article.title + article.summary;
      const fileList = article.fileList;
      if (fileList !== undefined && fileList !== null) {
        const img: ImageFile = fileList[0];
        brick.image = Consts.IMAGE_HOST + img.filePath + img.type;
      }
      this.bricks.push(brick);
    }
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

  // @HostListener('scroll', ['$event']) private onScroll($event: Event) {
  //   console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  // }
}
