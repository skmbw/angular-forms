import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  constructor(private snackBar: MatSnackBar, private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.user.name === undefined || this.user.name === '') {
      this.snackBar.open('用户名不能为空！', '确定', {
        duration: 2000,
      });
    }
    console.log('submit' + this.user.name + this.user.password);
  }
}
