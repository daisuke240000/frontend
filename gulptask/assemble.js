//gulp本体を読み込む
const gulp = require('gulp');
//htmlをminifyする
const htmlmin = require('gulp-htmlmin');
//名前を変更する
const rename = require('gulp-rename');
//拡張子を変更する
const extname = require('gulp-extname');
//組み立てる
const assemble = require('assemble');
//エラーで止まらない
const plumber = require('gulp-plumber');
//JSONを扱う
const gulpJsonHandlebars = require('gulp-json-handlebars');
//Node.jsのパスを扱う
const path    = require('path');
//fsは不要と言われているが、一応入れておく。
const fs = require("fs");
//assembleを格納する
const app = assemble();
//package.jsonを格納する
const package = JSON.parse(fs.readFileSync("package.json", { encoding:"utf8" }));
//data.jsonを格納する
const obj = JSON.parse(fs.readFileSync("./src/data/data.json", { encoding:"utf8" }));

//色んな部品を読み込む
gulp.task('load', function(cb) {
  app.partials('src/partials/*.hbs');
  app.layouts('src/layouts/index.hbs');
  app.pages('src/doc/**/*.hbs');
  // console.log(app);
  cb();
});
//組み立てる
gulp.task('assemble',
  gulp.series(
  // gulp.parallel(
    'load',
      function assemble_html(){
        return app.toStream('pages')
        .pipe(plumber())
        .pipe(app.renderFile({layout:'index',o:obj,p:package}))
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(rename({basename:'index'}))
        .pipe(extname('.html'))
        .pipe(app.dest('dist/'));
      }
  )
);
//gulp v4.0.0で動く
