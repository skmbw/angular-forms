import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName: string;
  userId: string;
  // user: User;

  ngOnInit(): void {
    this.userName = window.sessionStorage.getItem('sess_user_name');
    this.userId = window.sessionStorage.getItem('sess_user_id');
    // this.userId = this.user.id;
    // this.userName = this.user.account;
  }
}
