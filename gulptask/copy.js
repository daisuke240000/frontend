var gulp = require('gulp');
gulp.task('copy',
  gulp.series(
  // gulp.parallel(
    function(){
    return gulp.src('./src/asset/**')
      .pipe(gulp.dest('./dist/'));
    }
  )
);
//gulp v4.0.0ではこう書く。
