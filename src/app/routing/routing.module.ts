import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MasonryDemoComponent} from '../masonry-demo/masonry-demo.component';
import {HeroFormComponent} from '../hero-form/hero-form.component';
import {RegisterComponent} from '../register/register.component';

const routes: Routes = [
  // 默认路由，这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由
  {path: '', redirectTo: '/masonry', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'masonry', component: MasonryDemoComponent},
  {path: 'hero', component: HeroFormComponent},
  // {path: 'detail/:id', component: HeroDetailComponent}
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
