var gulp = require("gulp");
gulp.task('watch',function(){
    return gulp.watch('./src/doc/**',
      gulp.task(
        gulp.series(
          gulp.parallel(
            'assemble','copy'
          )
        )
      )
    );
});
//gulp v4.0.0 ではこう書く？のかな。。
