import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../model/user';

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper.component.html',
  styleUrls: ['./avatar-cropper.component.css']
})
export class AvatarCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedFile: any = null;

  constructor(private userService: UserService, private toastr: ToastrService,
              private dialogRef: MatDialogRef<AvatarCropperComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // base64 image
  imageCropped(image: string) {
    this.croppedImage = image;
  }

  // file image
  imageCroppedFile(image: any) {
    this.croppedFile = image;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show error message
    this.toastr.info('加载图片错误。');
  }

  upload() {
    this.dialogRef.close();
  }
}
