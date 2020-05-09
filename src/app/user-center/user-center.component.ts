import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Consts} from '../common/consts';
import {MatDialog} from '@angular/material/dialog';
import {PasswordComponent} from '../password/password.component';
import {ProfileComponent} from '../profile/profile.component';
import {AvatarCropperComponent} from '../avatar-cropper/avatar-cropper.component';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {

  constructor(private userService: UserService, private router: ActivatedRoute,
              private dialog: MatDialog) {
  }

  url = Consts.IMAGE_HOST;
  user: User = new User();
  userId: string = null;

  // result: any = null;

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.detail(this.userId).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.user = jsonBean.data;
          this.user.birthday = this.user.birthday.substring(0, 10);
        }
      });
    });
  }

  updatePassword() {
    this.dialog.open(PasswordComponent, {
      width: '650px',
      height: '400px',
      data: {name: this.user.name, id: this.user.id}
    });
  }

  updateProfile() {
    this.dialog.open(ProfileComponent, {
      width: '900px',
      height: '700px',
      data: this.user
    });
  }

  updateAvatar() {
    this.dialog.open(AvatarCropperComponent, {
      width: '900px',
      height: '700px',
      data: {name: this.user.name, id: this.user.id, account: this.user.account}
    });
  }
}
