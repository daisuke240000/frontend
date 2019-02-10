var gulp = require("gulp");
var requireDir = require('require-dir');

requireDir('./gulptask',{recurse: true});

gulp.task('default',
  gulp.series(
  //gulp.parallel(
      'assemble','copy','webserver','watch'
  //)
  )
);
// gulp v4.0.0ではこう書く。
