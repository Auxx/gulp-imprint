const bump = require('gulp-bump');

function create(gulp, options) {
  gulp.task('imprint:bump:major', () => {
    return gulp.src(options.packageFile, { base: "./" })
      .pipe(bump({ type: 'major' }))
      .pipe(gulp.dest('.'));
  });

  gulp.task('imprint:bump:minor', () => {
    return gulp.src(options.packageFile, { base: "./" })
      .pipe(bump({ type: 'minor' }))
      .pipe(gulp.dest('.'));
  });

  gulp.task('imprint:bump:patch', () => {
    return gulp.src(options.packageFile, { base: "./" })
      .pipe(bump({ type: 'patch' }))
      .pipe(gulp.dest('.'));
  });
}

module.exports = create;
