import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../service/article.service';
import {Article} from '../model/article';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  content: any;
  constructor(private articleService: ArticleService, private snackBar: MatSnackBar,
              private router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.articleService.detail(id).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.article = jsonBean.data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
        } else {
          this.snackBar.open('文章不存在，亲！', '确定', {
            duration: 2000,
          });
        }
      });
    });
  }

}
