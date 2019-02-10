const gulp = require('gulp');
const fs = require('fs');
const Parker = require('parker/lib/Parker');
const prettyJSON = require('prettyjson');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const CONFIG = require('../config.js');



// Prepare dependencies
gulp.task('sass:deps',
  gulp.series(
    function deps() {
      return gulp.src(CONFIG.SASS_DEPS_FILES)
      .pipe(gulp.dest('_vendor'));
    }
  )
);

// Compiles Foundation Sass
gulp.task('sass:foundation',
  gulp.series(
   'sass:deps',function foundation() {
     return gulp.src(['assets/*'])
     .pipe(sourcemaps.init())
     .pipe(plumber())
     .pipe(sass().on('error', sass.logError))
     .pipe(postcss(
          [autoprefixer
            (
              {browsers: CONFIG.CSS_COMPATIBILITY}
            )
          ]
        )
      )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'))
    .on('finish', function() {
      gulp.src(CONFIG.SASS_LINT_FILES)
        .pipe(sassLint({
            config: './.sass-lint.yml'
        }))
      })
    .pipe(sassLint.format());
   }
  )
);

// Compiles docs Sass (includes Foundation code also)
gulp.task('sass:docs',
  gulp.series(
    'sass:deps', function docs() {
      return gulp.src('src/asset/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: CONFIG.SASS_DOC_PATHS
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
    }
  )
);

// Audits CSS filesize, selector count, specificity, etc.
// gulp.task('sass:audit',
//   gulp.series(
//   'sass:foundation', function(cb) {
//     fs.readFile('./_build/assets/css/foundation.css', function(err, data) {
//       var parker = new Parker(require('parker/metrics/All'));
//       // var results = parker.run(data.toString());
//       // console.log(prettyJSON.render(results));
//       cb();
//     });
//   }
//   )
// );

//Compiles Sass files into CSS
gulp.task('sass',
  gulp.series(
    'sass:foundation','sass:docs'
  )
);
