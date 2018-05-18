import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {TokenStorage} from '../token/token.storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: User = new User();

  constructor(private userService: UserService, private snackBar: MatSnackBar,
              private tokenStorage: TokenStorage, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.user.account === undefined || this.user.account === '') {
      this.snackBar.open('账户不能为空！', '确定', {
        duration: 2000,
      });
      return;
    }
    if (this.user.password === undefined || this.user.password === '') {
      this.snackBar.open('密码不能为空！', '确定', {
        duration: 2000,
      });
      return;
    }
    this.userService.login(this.user).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        const user: User = jsonBean.data;
        this.tokenStorage.saveToken(user.tokenId);
        this.tokenStorage.saveUser(user);
        this.router.navigateByUrl('/index').catch();
      } else {
        this.snackBar.open(jsonBean.message, '确定', {duration: 2000});
      }
    });
  }
}
