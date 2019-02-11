var gulp = require('gulp');
var browserSync = require("browser-sync");

gulp.task('browserSync',
  gulp.series(
    function start_serve(){
      browserSync({
        server:{
          baseDir:"./dist/"
        }
      })
    }
    // .pipe(gulp.watch("./dist/**/*.js",['reload']);)
  )
);
