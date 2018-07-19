import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Consts} from '../common/consts';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {

  constructor(private userService: UserService, private router: ActivatedRoute) {
  }

  url = Consts.IMAGE_HOST;
  user: User = new User();
  userId: string = null;

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

}
