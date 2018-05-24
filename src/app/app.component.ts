import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName: string;

  ngOnInit(): void {
    this.userName = window.sessionStorage.getItem('sess_user_name');
  }
}
