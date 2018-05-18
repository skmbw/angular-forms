import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  hide = true;

  constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router) {
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
    if (this.user.password !== this.user.checkPasswd) {
      this.snackBar.open('两次输入密码不相同！', '确定', {
        duration: 2000,
      });
      return;
    }
    // 这里是测试，直接跳转（应用内路由跳转）
    // this.router.navigateByUrl('/login').catch();
    this.userService.register(this.user).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.snackBar.open('注册成功，请登录。', '确定', {duration: 2000});
        // 两秒后跳转
        setTimeout(() => {
          this.router.navigateByUrl('/login').catch();
        }, 2000);
      } else {
        this.snackBar.open(jsonBean.message, '确定', {duration: 2000});
      }
    });
  }
}
