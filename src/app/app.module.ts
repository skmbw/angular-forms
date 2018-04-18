import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {FormsModule} from '@angular/forms';
import {MasonryModule} from './masonry.module';
import {MasonryDemoComponent} from './masonry-demo/masonry-demo.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    MasonryDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    MasonryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
