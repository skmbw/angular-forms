import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  id: string;

  constructor() {
  }

  // 如果这里使用属性绑定，那么在页面没有渲染完之前，拿不到数据（构造函数和OnInit方法中都拿不到）
  @Input()
  set articleId(articleId: string) {
    this.id = articleId;
    if (this.id !== undefined) {
      alert(this.id);
    }
  }

  get articleId(): string {
    return this.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChages执行了···' + this.id);
  }

  ngOnInit() {
    console.log('ogOnInit执行了····' + this.id);
  }

  ngDoCheck() {
    console.log('ngDoCheck执行了····' + this.id);
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit执行了···' + this.id);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked执行了···' + this.id);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit执行了····' + this.id);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked执行了····' + this.id);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy执行了····' + this.id);
  }

}
