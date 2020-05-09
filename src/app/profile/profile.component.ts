import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../model/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PasswordComponent} from '../password/password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private toastr: ToastrService,
              public dialogRef: MatDialogRef<PasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit() {
    this.user = this.data;
  }

  update() {
    this.userService.updateInfo(this.user).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('修改个人信息成功！');
        this.dialogRef.close();
      } else {
        this.toastr.info(jsonBean.message);
      }
    });
  }
}
