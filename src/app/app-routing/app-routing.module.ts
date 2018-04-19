import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // 默认路由，这个路由会把一个与空路径"完全匹配"的 URL 重定向到路径为 '/' 的路由
  {path: '', redirectTo: '/', pathMatch: 'full'}
  // {path: 'heroes', component: HeroesComponent},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
