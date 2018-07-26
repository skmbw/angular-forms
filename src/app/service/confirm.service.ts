import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/index';
import {ConfirmComponent} from '../confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  confirm(content: any): Observable<any> {
    return this.dialog.open(ConfirmComponent, {
      width: '650px',
      height: '400px',
      data: content}).afterClosed();
  }
}
