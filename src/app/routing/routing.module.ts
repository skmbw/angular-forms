import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {IndexComponent} from '../index/index.component';
import {HeroFormComponent} from '../hero-form/hero-form.component';
import {RegisterComponent} from '../register/register.component';
import {ArticleDetailComponent} from '../article-detail/article-detail.component';
import {UserCenterComponent} from '../user-center/user-center.component';
import {LogoutComponent} from '../logout/logout.component';
import {ArticlePublishComponent} from '../article-publish/article-publish.component';
import {AskComponent} from '../ask/ask.component';
import {QuestionComponent} from '../question/question.component';

const routes: Routes = [
  // 默认路由，这个路由会把一个与空路径"完全匹配"的 URL 重定向到路径为 '/index' 的路由
  {path: '', redirectTo: '/article', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'article', component: IndexComponent},
  {path: 'hero', component: HeroFormComponent},
  {path: 'article/detail/:id', component: ArticleDetailComponent},
  {path: 'article/write', component: ArticlePublishComponent},
  {path: 'user/center/:id', component: UserCenterComponent},
  {path: 'user/logout', component: LogoutComponent},
  {path: 'ask', component: AskComponent},
  {path: 'question', component: QuestionComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {
}
