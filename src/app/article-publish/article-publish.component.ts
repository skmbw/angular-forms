import {Component, OnInit} from '@angular/core';
import {Article} from '../model/article';

@Component({
  selector: 'app-article-publish',
  templateUrl: './article-publish.component.html',
  styleUrls: ['./article-publish.component.css']
})
export class ArticlePublishComponent implements OnInit {
  content: string = null;
  article: Article = new Article();

  constructor() {

  }

  ngOnInit() {
  }

}
