var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var extname = require('gulp-extname');
var assemble = require('assemble');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var webserver = require('gulp-livereload');

var path    = require('path');
var fs = require("fs");
var app = assemble();
var obj = JSON.parse(fs.readFileSync("./src/data/data.json", { encoding:"utf8" }));
gulp.task('load', function(cb) {
  app.partials('src/partials/*.hbs');
  app.layouts('src/layouts/index.hbs');
  app.pages('src/doc/**/*.hbs');
  cb();
});

gulp.task('assemble',
  gulp.series(
  gulp.parallel('load'),
      function(){
        return app.toStream('pages')
        .pipe(plumber())
        .pipe(app.renderFile({layout:'index',obj:obj}))
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(rename({basename:'index'}))
        .pipe(extname('.html'))
        .pipe(app.dest('dist/'));
      }
  )
);
//gulp v4.0.0ではこう書く。
