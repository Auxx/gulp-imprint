const runSequence = require('run-sequence');

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

  gulp.task('imprint:package:build', done => {
    if (options.buildSequence !== null) {
      runSequence.apply(undefined, options.buildSequence.concat(done));
    } else {
      done();
    }
  });

  gulp.task(
    'imprint:package',
    done => runSequence(
      'imprint:clean',
      'imprint:package:build',
      'imprint:package:prepare',
      'imprint:package:overlay',
      done));
}

module.exports = create;
