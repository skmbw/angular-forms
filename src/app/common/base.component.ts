import {MatSnackBar} from '@angular/material';

export class BaseComponent {

  constructor(private snackBar: MatSnackBar) {
  }

  alert(message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }
}
