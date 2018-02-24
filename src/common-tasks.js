const del = require('del');

function create(gulp, options) {
  gulp.task('imprint:clean', () => {
    if (options.cleanBuildDir) {
      del.sync(options.buildDir);
    }

    if (options.cleanPackageDir) {
      del.sync(options.packageDir);
    }
  });
}

module.exports = create;
