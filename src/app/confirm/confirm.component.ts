import {Component, Inject, OnInit} from '@angular/core';
import {PasswordComponent} from '../password/password.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  config: any = {};

  constructor(public dialogRef: MatDialogRef<PasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
