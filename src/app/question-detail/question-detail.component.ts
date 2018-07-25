import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../service/question.service';
import {BaseComponent} from '../common/base.component';
import {MatSnackBar} from '@angular/material';
import {Consts} from '../common/consts';
import {Question} from '../model/question';
import {faCheck, faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import {LoveService} from '../service/love.service';
import {Love} from '../model/love';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent extends BaseComponent implements OnInit {
  question: Question = new Question();
  content: any;
  faHeart = faHeart;
  faPlus = faPlus;
  faCheck = faCheck;

  constructor(private questionService: QuestionService, private router: ActivatedRoute,
              private sanitizer: DomSanitizer, snackBar: MatSnackBar,
              private loveService: LoveService, private toastr: ToastrService) {
    super(snackBar);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.question.id = id; // 因为有@Input()数据绑定，将数据及时传递给子组件
      this.questionService.detail(id).subscribe(jsonBean => {
        if (jsonBean.code === 1) {
          this.question = jsonBean.data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.question.content.replace('{{image.server}}', Consts.IMAGE_URL));
        } else {
          this.alert(jsonBean.message);
        }
      });
    });
  }

  zan(question: Question) {
    const love = new Love();
    love.id = question.id;
    love.type = 2;
    love.category = 0;
    love.loveNumber = 1;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，点赞成功！');
        question.loveNumber++;
      }
    });
  }

  focus(question: Question) {
    const love = new Love();
    love.id = question.id;
    love.type = 2;
    love.category = 2;
    love.focusNumber = 1;
    love.remark = question.title;
    this.loveService.save(love).subscribe(jsonBean => {
      if (jsonBean.code === 1) {
        this.toastr.success('亲，关注成功！');
        question.focusNumber++;
      }
    });
  }

}
