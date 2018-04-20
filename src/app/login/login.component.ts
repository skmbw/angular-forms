import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private registry: MatIconRegistry) {
  }

  ngOnInit() {
  }

}
