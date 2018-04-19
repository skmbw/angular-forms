import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MasonryOptions} from '../masonry-options';
import {AngularMasonryComponent} from '../masonry.component';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {filter} from 'rxjs/operators/filter';
import {fromEvent} from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-masonry-demo',
  templateUrl: './masonry-demo.component.html',
  styleUrls: ['./masonry-demo.component.css']
})
export class MasonryDemoComponent implements OnInit, AfterViewInit {

  // Inject AngularMasonryComponent instance from template
  @ViewChild(AngularMasonryComponent) masonry: AngularMasonryComponent;
  columnTop: string;
  // Some bricks
  // bricks = [
  //   { id: 0, size: 'sm' },
  //   { id: 1, size: 'sm' },
  //   { id: 2, size: 'lg' },
  //   { id: 3, size: 'sm' },
  //   { id: 4, size: 'md' },
  //   { id: 5, size: 'lg' },
  //   { id: 6, size: 'sm' },
  //   { id: 7, size: 'sm' },
  //   { id: 8, size: 'sm' },
  //   { id: 9, size: 'md' },
  //   { id: 10, size: 'lg' },
  //   { id: 11, size: 'sm' },
  //   { id: 12, size: 'sm' },
  //   { id: 13, size: 'sm' },
  //   { id: 14, size: 'lg' },
  //   { id: 15, size: 'lg' }
  // ];

  // bricks = [
  //   { id: 0, image: 'http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg' },
  //   { id: 1, image: 'http://www.planwallpaper.com/static/images/i-should-buy-a-boat.jpg' },
  //   { id: 2, image: 'http://www.intrawallpaper.com/static/images/8810721-full-hd-wallpapers-27699_tQsN85h_aTROZZr.jpg' },
  //   { id: 3, image: 'http://www.intrawallpaper.com/static/images/4k-wallpaper-154.jpg' },
  // ];

  bricks: any[] = [];

  // Options
  options: MasonryOptions = {
    transitionDuration: '0.3s'
  };
  // ObservableMedia 并不是真正意义上的 Observable. 它仅仅是一个被用来暴露额外方法 如 isActive()的外壳。
  // 用.asObservable() 来转换成Observable，然后就可以用RxJs操作符了 如such as media.asObservable().filter(….).
  constructor(media: ObservableMedia) {
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
  }

  addText() {
    const lorem = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at tortor eu lacus imperdiet volutpat.' +
      ' Aliquam erat volutpat. Integer et.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor in leo sagittis aliquam. ' +
      'Quisque porta nisi sed diam sollicitudin.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nunc nibh, ' +
      'faucibus in commodo tincidunt, placerat a eros. Suspendisse nisi ex, semper at vehicula non, congue sit amet nibh. Donec.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, velit porta tincidunt pulvinar, ' +
      'ligula nisl posuere metus, quis bibendum neque lacus non urna. Sed ut diam auctor, sagittis purus.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis facilisis tortor ac elementum.' +
      ' Aliquam vestibulum, lorem id semper sollicitudin, nulla nibh fringilla felis, ut rhoncus elit ex sit amet dui.' +
      ' Sed eleifend felis in luctus varius. Maecenas venenatis id.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet, tortor ac euismod tincidunt, ' +
      'elit est convallis tortor, id venenatis massa ipsum nec nisl. In mattis felis luctus neque tristique, ' +
      'id varius libero finibus. Aliquam mattis lobortis diam eget venenatis.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae fermentum neque, sit amet laoreet lorem. ' +
      'Suspendisse nibh lacus, sollicitudin at metus id, convallis posuere lectus. Duis nec facilisis nibh. ' +
      'Nunc consequat maximus fringilla. Phasellus turpis arcu, auctor nec nunc non, posuere tristique neque. Sed feugiat elementum quam,' +
      ' in ultrices.',
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
      'http://img4.imgtn.bdimg.com/it/u=1293919120,3114443152&fm=27&gp=0.jpg',
      'http://pic71.nipic.com/file/20150610/13549908_104823135000_2.jpg',
      'http://img.taopic.com/uploads/allimg/121115/240487-12111520035993.jpg'
    ];

    const index = Math.floor(Math.random() * lorem.length);

    this.bricks.push({image: lorem[index]});
  }

  remove(brick) {
    this.bricks.splice(this.bricks.indexOf(brick), 1);
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

  ngOnInit() {
    this.columnTop = '0';
    fromEvent(window, 'scroll').subscribe((event) => {
      this.onWindowScroll();
    });
  }

  onWindowScroll() {
    // this.columnTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) + 'px';
    if (this.getScrollTop() + this.getClientHeight() === this.getScrollHeight()) {
      console.log('滚动到底部');
      this.addImage();
      this.addText();
      this.addImage();
      this.addText();
      this.addImage();
      this.addText();
    }
  }

  // @HostListener('scroll', ['$event']) private onScroll($event: Event) {
  //   console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  // }
}
