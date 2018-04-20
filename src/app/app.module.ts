import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {FormsModule} from '@angular/forms';
import {MasonryModule} from './masonry/masonry.module';
import {MasonryDemoComponent} from './masonry-demo/masonry-demo.component';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatCommonModule,
  MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ArticleService} from './service/article.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    MasonryDemoComponent,
    LoginComponent,
    RegisterComponent
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
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
