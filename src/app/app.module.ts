import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MasonryModule} from './masonry/masonry.module';
import {IndexComponent} from './index/index.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ArticleService} from './service/article.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './service/user.service';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {TokenStorage} from './token/token.storage';
import {TokenInterceptor} from './token/token.interceptor';
import {UserCenterComponent} from './user-center/user-center.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {AccountComponent} from './account/account.component';
import {LogoutComponent} from './logout/logout.component';
import {ArticleCommentComponent} from './article-comment/article-comment.component';
import {OrderListComponent} from './order-list/order-list.component';
import {ArticlePublishComponent} from './article-publish/article-publish.component';
import {AskComponent} from './ask/ask.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {MessageService} from './service/message.service';
import {QuestionComponent} from './question/question.component';
import {QuestionService} from './service/question.service';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import {AnswerComponent} from './answer/answer.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {AnswerService} from './service/answer.service';
import {HtmlPipe} from './common/html.pipe';
import {CommentService} from './service/comment.service';
import {ToastrModule} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoveService} from './service/love.service';
import {FavoriteService} from './service/favorite.service';
import {MyAnswerComponent} from './my-answer/my-answer.component';
import {PasswordComponent} from './password/password.component';
import {ProfileComponent} from './profile/profile.component';
import {MyCommentComponent} from './my-comment/my-comment.component';
import {MyFavoriteComponent} from './my-favorite/my-favorite.component';
import {MyScoreComponent} from './my-score/my-score.component';
import {AvatarCropperComponent} from './avatar-cropper/avatar-cropper.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RightAnswerComponent} from './right-answer/right-answer.component';
import {SelectAnswerComponent} from './select-answer/select-answer.component';
import {DialogueComponent} from './dialogue/dialogue.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {ConfirmService} from './service/confirm.service';
import {AgreementComponent} from './agreement/agreement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent,
    UserCenterComponent,
    ArticleListComponent,
    QuestionListComponent,
    AccountComponent,
    LogoutComponent,
    ArticleCommentComponent,
    OrderListComponent,
    ArticlePublishComponent,
    AskComponent,
    QuestionComponent,
    QuestionDetailComponent,
    AnswerComponent,
    AnswerListComponent,
    HtmlPipe,
    MyAnswerComponent,
    PasswordComponent,
    ProfileComponent,
    MyCommentComponent,
    MyFavoriteComponent,
    MyScoreComponent,
    AvatarCropperComponent,
    RightAnswerComponent,
    SelectAnswerComponent,
    DialogueComponent,
    ConfirmComponent,
    AgreementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MasonryModule,
    FlexLayoutModule,
    HttpClientModule,
    RoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    // 如果不在这里配置，chrome会提示脏检查错误
    ToastrModule.forRoot({timeOut: 3000,
      positionClass: 'toast-top-center'}),
    FontAwesomeModule,
    ImageCropperModule
  ],
  // dialog content factory，里面的组件作为dialog的内容
  entryComponents: [
    PasswordComponent,
    ProfileComponent,
    AvatarCropperComponent,
    ConfirmComponent
  ],
  providers: [
    ArticleService,
    UserService,
    TokenStorage,
    [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    MessageService,
    QuestionService,
    AnswerService,
    CommentService,
    LoveService,
    FavoriteService,
    ConfirmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
