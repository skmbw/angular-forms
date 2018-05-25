import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {

  constructor(private userService: UserService, private router: ActivatedRoute) {
  }

  user: User = new User();
  ngOnInit() {
    this.router.params.subscribe(params => {
      const userId = params['id'];
      this.userService.detail(userId).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.user = jsonBean.data;
        }
      });
    });
  }

}
