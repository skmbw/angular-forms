import {Component, OnInit} from '@angular/core';
import {TokenStorage} from '../token/token.storage';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private storage: TokenStorage, private router: Router, private app: AppComponent) { }

  ngOnInit() {
    this.storage.logout();
    this.app.userName = null;
    this.app.userId = null;
    this.router.navigateByUrl('/article').catch();
  }

}
