import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../service/favorite.service';
import {ToastrService} from 'ngx-toastr';
import {Love} from '../model/love';
import {TokenStorage} from '../token/token.storage';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {
  favoriteList: Love[] = [];

  constructor(private favoriteService: FavoriteService, private toastr: ToastrService,
              private tokenStorage: TokenStorage) {
  }

  ngOnInit() {
    const love = new Love();
    love.userId = this.tokenStorage.getUserId();
    this.favoriteService.list(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.favoriteList = jsonBean.data;
      } else {}
    });
  }

}
