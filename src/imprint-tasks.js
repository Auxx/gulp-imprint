const runSequence = require('run-sequence');

function create(gulp, options) {
  gulp.task(
    'imprint:patch',
    done => runSequence(
      'imprint:release:patch',
      'imprint:package',
      'imprint:npm:publish',
      done));

  gulp.task(
    'imprint:minor',
    done => runSequence(
      'imprint:release:minor',
      'imprint:package',
      'imprint:npm:publish',
      done));

  gulp.task(
    'imprint:major',
    done => runSequence(
      'imprint:release:major',
      'imprint:package',
      'imprint:npm:publish',
      done));
}

module.exports = create;
