import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {ToastrService} from 'ngx-toastr';
import {Article} from '../model/article';
import {Consts} from '../common/consts';
import {MatPaginator} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of} from 'rxjs/index';

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
  // isLoadingResults = false;

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
          return this.articleService.list(this.paginator.pageIndex + 1);
        }),
        map(data => {
          // this.isLoadingResults = false;
          this.resultLength = data.data.length;
          return data.data;
        }),
        catchError(() => {
          // this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => {
        this.articleList = data;
      });
  }

}
