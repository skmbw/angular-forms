import {Component, OnInit} from '@angular/core';
import {Article} from '../model/article';
import {MatSnackBar} from '@angular/material';
import {ArticleService} from '../service/article.service';

@Component({
  selector: 'app-article-publish',
  templateUrl: './article-publish.component.html',
  styleUrls: ['./article-publish.component.css']
})
export class ArticlePublishComponent implements OnInit {
  content: string = null;
  article: Article = new Article();

  constructor(private snackBar: MatSnackBar, private articleService: ArticleService) {

  }

  ngOnInit() {
  }

  public submit() {
    if (this.article.title === null) {
      this.snackBar.open('文章标题不能为空。', null, {duration: 2000});
      return;
    }
  }
}
