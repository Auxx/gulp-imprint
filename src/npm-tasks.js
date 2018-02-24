const spawn = require('child_process').spawn;

// TODO Refactor to async/await + gulp-exec
function create(gulp, options) {
  gulp.task(
    'imprint:npm:publish',
    done => spawn('npm', [ 'publish' ], { cwd: options.packageDir, stdio: 'inherit' }).on('close', done));
}

module.exports = create;
