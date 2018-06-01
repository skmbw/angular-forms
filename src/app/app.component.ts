import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {IndexComponent} from './index/index.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName: string;
  userId: string;
  // user: User;
  keyword: string = null;

  @ViewChild(IndexComponent)
  indexComponent: IndexComponent;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userName = window.sessionStorage.getItem('sess_user_name');
    this.userId = window.sessionStorage.getItem('sess_user_id');
    // this.userId = this.user.id;
    // this.userName = this.user.account;
  }

  public search() {
    if (this.keyword === null || this.keyword.trim() === '') {
      this.snackBar.open('搜索条件不能为空哦，亲！', '', {duration: 2000});
      return;
    }
    alert('敬请期待！');
  }
}
