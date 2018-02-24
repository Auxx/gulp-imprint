const gulp = require('gulp');
const imprint = require('./src');

imprint(gulp, { buildSequence: [ 'build' ] });

gulp.task('build', () => {
  return gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist/out'));
});
