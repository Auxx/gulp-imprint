const gulp = require('gulp');
const imprint = require('./src');

imprint(gulp);

gulp.task('default', () => {
  return gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist/out'));
});
