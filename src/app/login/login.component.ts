import {Component, OnInit} from '@angular/core';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: User = new User();

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
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
  }
}
