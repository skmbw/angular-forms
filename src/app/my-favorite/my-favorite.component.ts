import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../service/favorite.service';
import {ToastrService} from 'ngx-toastr';
import {Love} from '../model/love';
import {TokenStorage} from '../token/token.storage';
import {faChevronLeft, faChevronRight, faMinusSquare} from '@fortawesome/free-solid-svg-icons';
import {ConfirmService} from '../service/confirm.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {
  favoriteList: Love[] = [];
  page = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faMinusSquare = faMinusSquare;
  init = false;

  constructor(private favoriteService: FavoriteService, private toastr: ToastrService,
              private tokenStorage: TokenStorage, private comfirm: ConfirmService) {
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(p: number) {
    let pg = this.page;
    if (p === -1) {
      pg = this.page - 1;
      if (pg < 1) {
        pg = 1;
      }
    } else {
      pg += 1;
    }
    const love = new Love();
    love.userId = this.tokenStorage.getUserId();
    love.page = pg;
    this.favoriteService.list(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.favoriteList = jsonBean.data;
        if (this.favoriteList !== undefined && this.favoriteList.length > 0) {
          this.page += p;
          if (this.page === 0) {
            this.page = 1;
          }
        } else {
          if (this.init) {
            this.toastr.success('没有更多数据了，亲！');
          }
        }
      } else {
        if (this.init) {
          this.toastr.info(jsonBean.message);
        }
      }
      this.init = true;
    });
  }

  delete(love: Love) {
    this.comfirm.confirm('您确定取消关注？').subscribe(value => {
      if (value) {
        this.favoriteService.delete(love).subscribe(result => {
          if (result.code === 1) {
            this.toastr.success('已取消关注。');
            this.favoriteList.splice(this.favoriteList.indexOf(love), 1);
          } else {
            this.toastr.info(result.message);
          }
        });
      }
    });
  }
}
