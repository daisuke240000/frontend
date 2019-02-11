const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require("autoprefixer");
// var requireDir = require('require-dir');
// requireDir('../gulptask',{recurse: true});

gulp.task('watch',
  // gulp.series('webserver',
  function(){
    gulp.watch('./src/asset/scss/**.scss', function sasscompile(){
        gulp.src('./src/asset/scss/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(postcss([autoprefixer()]))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./dist/css/'));
        })
      }
  // )
);
//gulp v4.0.0 ではこう書く？のかな。。
