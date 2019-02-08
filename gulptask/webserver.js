var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver',
  gulp.series(
  // gulp.parallel(
    function(){
      gulp.src('dist')
        .pipe(webserver({
          host: 'localhost',
          port: 8888,
          livereload: true
        })
      );
    }
  )
);
