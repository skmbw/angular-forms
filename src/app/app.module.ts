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
  MatDividerModule,
  MatFormFieldModule,
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
import {FroalaComponent} from './article-publish/froala.component';
import {FroalaAppComponent} from './article-publish/froala-app.component';
import {QuestionComponent} from './question/question.component';
import {QuestionService} from './service/question.service';

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
    FroalaComponent,
    FroalaAppComponent,
    QuestionComponent
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
    MatSidenavModule,
    MatProgressSpinnerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    ArticleService,
    UserService,
    TokenStorage,
    [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    MessageService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
