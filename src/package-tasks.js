function create(gulp, options) {
  gulp.task('imprint:package:prepare', () => {
    return gulp
      .src(`${options.buildDir}/**/*`)
      .pipe(gulp.dest(options.packageDir));
  });

  gulp.task('imprint:package:overlay', () => {
    return gulp
      .src(options.overlays)
      .pipe(gulp.dest(options.packageDir));
  });
}

module.exports = create;
