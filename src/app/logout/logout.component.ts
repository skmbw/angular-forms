import {Component, OnInit} from '@angular/core';
import {TokenStorage} from '../token/token.storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private storage: TokenStorage, private router: Router) { }

  ngOnInit() {
    this.storage.logout();
    this.router.navigateByUrl('/index').catch();
  }

}
