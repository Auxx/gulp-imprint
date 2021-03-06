const exec = require('./gulp-exec');
const runSequence = require('run-sequence');
const escape = require('any-shell-escape');
const path = require('path');

const shellCommands = {
  checkout: 'git checkout master',
  pull: 'git pull',
  push: 'git push',
  pushTags: 'git push --tags'
};

function create(gulp, options) {
  gulp.task('imprint:release:git:prepare', async () => {
    if (options.dryRun) {
      console.log(shellCommands.checkout);
      console.log(shellCommands.pull);
    } else {
      await exec(shellCommands.checkout);
      await exec(shellCommands.pull);
    }
  });

  gulp.task('imprint:release:git:tag', async () => {
    const version = require(path.join(process.cwd(), options.packageFile)).version;
    const versionMessage = options.commitPrefix + version;
    const addCmd = `git add ${escape(options.packageFile)}`;
    const commitCmd = `git commit -m "${versionMessage}"`;
    const tagCmd = `git tag -a ${escape(version)} -m "${versionMessage}"`;

    if (options.dryRun) {
      console.log(addCmd);
      console.log(commitCmd);
      console.log(tagCmd);
      console.log(shellCommands.push);
      console.log(shellCommands.pushTags);
    } else {
      await exec(addCmd);
      await exec(commitCmd);
      await exec(tagCmd);
      await exec(shellCommands.push);
      await exec(shellCommands.pushTags);
    }
  });

  gulp.task(
    'imprint:release:patch',
    done => runSequence(
      'imprint:release:git:prepare',
      'imprint:bump:patch',
      'imprint:release:git:tag',
      done));

  gulp.task(
    'imprint:release:minor',
    done => runSequence(
      'imprint:release:git:prepare',
      'imprint:bump:minor',
      'imprint:release:git:tag',
      done));

  gulp.task(
    'imprint:release:major',
    done => runSequence(
      'imprint:release:git:prepare',
      'imprint:bump:major',
      'imprint:release:git:tag',
      done));
}

module.exports = create;
