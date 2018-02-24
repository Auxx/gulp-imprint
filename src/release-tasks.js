const through = require('through2');
const exec = require('./gulp-exec');

function create(gulp, options) {
  /*
   * 1. Switch to master
   * 2. Pull
   * 3. Bump
   * 4. Add + Commit
   * 5. Create tag
   * 6. Push tag
   * 7. Push master
   */

  gulp.task('imprint:release:git:prepare', async() => {
    await exec('git checkout master');
    await exec('git pull');
  });
}

module.exports = create;
