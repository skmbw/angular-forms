import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  hide = true;
  user = new User();

  constructor(public dialogRef: MatDialogRef<PasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService) {
  }

  // cancel(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
  }

  update(): void {
    this.dialogRef.close();
  }
}
