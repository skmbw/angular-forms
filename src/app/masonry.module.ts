import { NgModule } from '@angular/core';
import { AngularMasonryComponent } from './masonry.component';
import { MasonryBrickDirective } from './masonry-brick.directive';

const DIRECTIVES = [AngularMasonryComponent, MasonryBrickDirective];

@NgModule({
    declarations: DIRECTIVES,
    exports: DIRECTIVES
})
export class MasonryModule {}
