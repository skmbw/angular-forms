import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {ToastrService} from 'ngx-toastr';
import {Article} from '../model/article';
import {Consts} from '../common/consts';
import {faChevronLeft, faChevronRight, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ConfirmService} from '../service/confirm.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input()
  userId: string;
  articleList: Article[] = [];
  imageHost = Consts.IMAGE_HOST;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // resultLength = 0;
  faHeart = faHeart;
  faPlus = faPlus;
  page = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  init = false;

  constructor(private articleService: ArticleService, private toastr: ToastrService,
              private confirmService: ConfirmService, private router: Router) {
  }

  ngOnInit() {
    this.loadPage(1);
  }

  update(article: Article) {
    // this.router.navigateByUrl('/article/write?id=' + article.id, {queryParams: { page: 1 }, queryParamsHandling: 'preserve' }).catch();
    // TODO 后面的参数好像接收不到，暂时放到url中
    this.router.navigateByUrl('/article/write?id=' + article.id).catch();
  }

  delete(article: Article) {
    this.confirmService.confirm('删除后无法恢复，您确定要删除该文章？').subscribe(result => {
      if (result) {
        this.articleService.delete(article).subscribe(jsonBean => {
          if (jsonBean.code === 1) {
            this.toastr.success('文章删除成功！');
          } else {
            this.toastr.info(jsonBean.message);
          }
        });
      }
    });
  }

  loadPage(p: number) {
    let pg = this.page;
    if (p === -1) {
      pg = this.page - 1;
      if (pg < 1) {
        pg = 1;
      }
    } else {
      pg += 1;
    }
    const article = new Article();
    article.page = pg;
    article.firstFree = true;
    article.authorId = this.userId;
    this.articleService.list(article).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.articleList = jsonBean.data;
        if (this.articleList !== undefined && this.articleList.length > 0) {
          this.page += p;
          if (this.page === 0) {
            this.page = 1;
          }
        } else {
          if (this.init) {
            this.toastr.success('没有更多数据了，亲！');
          }
        }
      } else {
        if (this.init) {
          this.toastr.info(jsonBean.message);
        }
      }
      this.init = true;
    });
  }
}
