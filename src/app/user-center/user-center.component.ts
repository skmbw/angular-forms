import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Consts} from '../common/consts';
import {MatDialog} from '@angular/material';
import {PasswordComponent} from '../password/password.component';

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
        }
      });
    });
  }

  updatePassword() {
    // const dialogRef = this.dialog.open(PasswordComponent, {
    this.dialog.open(PasswordComponent, {
      width: '650px',
      height: '400px',
      data: {name: this.user.name, id: this.user.id}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.result = result;
    // });
  }
}
