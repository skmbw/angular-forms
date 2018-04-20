# AngularForms

* 这个是一个学习的项目，基本包含Angular5相关的基础知识。
* 同时还实现了waterfall，也就是瀑布流。使用指令实现的。样式使用了bootstrap 4.1.0。在布局上也使用了谷歌的FlexLayout和bootstrap的grid
，结合起来使用的。
* 创建组件时，如果存在多个module（同一级中，例如和app.module在同一个目录中），那么命令中需要添加--module=app（举例）参数
* 项目使用了 [Angular CLI](https://github.com/angular/angular-cli) 1.7.3. Angular是5.2的版本。基本都是最新的版本。
* masonry模组就是实现瀑布流的代码，可以单独拿出去使用，对应的例子是masonry-demo，其中使用使用了一个本地的http，可以去掉，或者换成你的。或者
使用内部的模拟数据（将注释放开）。

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
