var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver',
  gulp.series(
  // gulp.parallel(
    function(){
      gulp.src('./dist/')
        .pipe(webserver({
          host: '127.0.0.1',
          fallback: 'index.html',
          port: 8888,
          livereload: {
            enable: true,
            filter: function(fileName) {
              if (fileName.match(/.map$/)) {
                return false;
              } else {
                return true;
              }
            }
          },
          directoryListing: true,
          open: true
        })
      );
    }
  )
);
