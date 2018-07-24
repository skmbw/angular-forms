import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {ToastrService} from 'ngx-toastr';
import {Article} from '../model/article';
import {Consts} from '../common/consts';
import {MatPaginator} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of} from 'rxjs/index';
import {faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultLength = 0;
  faHeart = faHeart;
  faPlus = faPlus;

  constructor(private articleService: ArticleService, private toastr: ToastrService) {
  }

  ngOnInit() {
    // this.articleService.list(1).subscribe(jsonBean => {
    //   if (jsonBean.code === 1) {
    //     this.articleList = jsonBean.data;
    //   } else {
    //     this.toastr.info(jsonBean.message);
    //   }
    // });

    // 使用分页，但是这个分页用拿到所有的记录数，这个对于应用系统来说还好，对于互联网应用不太合适了。
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // this.isLoadingResults = true;
          const article = new Article();
          article.page = this.paginator.pageIndex + 1;
          article.firstFree = true;
          return this.articleService.list(article);
        }),
        map(jsonBean => {
          // this.isLoadingResults = false;
          // 这个记录数，不给真实的数据，后面调整吧
          this.resultLength = 35;
          // this.resultLength = jsonBean.data.length;
          return jsonBean.data;
        }),
        catchError(() => {
          // this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => {
        this.articleList = data;
      });
  }

  update(article: Article) {}
  delete(article: Article) {}
}
