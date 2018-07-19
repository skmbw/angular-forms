import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {ToastrService} from 'ngx-toastr';
import {Article} from '../model/article';
import {Consts} from '../common/consts';
import {faBars} from '@fortawesome/free-solid-svg-icons';

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
  faBars = faBars;

  constructor(private articleService: ArticleService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.articleService.list(1).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.articleList = jsonBean.data;
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }

}
