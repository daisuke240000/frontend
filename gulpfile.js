var gulp = require("gulp");
var requireDir = require('require-dir');

requireDir('./gulptask',{recurse: true});

gulp.task('default',
  gulp.series(
  //gulp.parallel(
      'clean','assemble','sass','copy','bump','webserver','watch'
  //)
  )
);
// gulp v4.0.0ではこう書く。
