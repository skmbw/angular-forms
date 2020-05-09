import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageService} from './service/message.service';

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

  constructor(private snackBar: MatSnackBar, private messageService: MessageService) {
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
    this.messageService.sendMessage(this.keyword);
  }
}
