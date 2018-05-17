import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {FormsModule} from '@angular/forms';
import {MasonryModule} from './masonry/masonry.module';
import {IndexComponent} from './index/index.component';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatCommonModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ArticleService} from './service/article.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './service/user.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatIconModule
  ],
  providers: [
    ArticleService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
