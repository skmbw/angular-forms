import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  hide = true;
  user = new User();

  constructor(public dialogRef: MatDialogRef<PasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService, private toastr: ToastrService) {
  }

  // cancel(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
  }

  update(): void {
    this.user.id = this.data.id;
    this.user.name = this.data.name;
    const oldPassword = this.user.oldPassword;
    if (oldPassword === undefined || oldPassword === null || oldPassword.trim() === '') {
      this.toastr.success('请输入原密码！');
      return;
    }
    const password = this.user.password;
    if (password === undefined || password === null || password.trim() === '') {
      this.toastr.success('请输入新密码！');
      return;
    }
    if (password.length < 8) {
      this.toastr.success('新密码长度最少为8位！');
      return;
    }
    if (password !== this.user.checkPasswd) {
      this.toastr.success('两次输入的新密码不相同！');
      return;
    }
    this.userService.updatePasswd(this.user).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.dialogRef.close();
        this.toastr.success('修改密码成功，亲！');
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }
}
