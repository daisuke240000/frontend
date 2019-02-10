var gulp = require('gulp');
var bump = require('gulp-bump');

//実行するたびにバージョンを上げていく
gulp.task('bump',
  gulp.series(
    function update(){
      return gulp.src('./package.json')
      .pipe(bump({type:'pacth'}))
//      .pipe(bump({type:'minor'}))
//      .pipe(bump({type:'major'}))
      .pipe(gulp.dest('./'));
    }
  )
);
//gulp v4.0.0ではこう書く。
