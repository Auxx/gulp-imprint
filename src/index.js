const commonTasks = require('./common-tasks');
const packageTasks = require('./package-tasks');
const npmTasks = require('./npm-tasks');
const bumpTasks = require('./bump-tasks');
const releaseTasks = require('./release-tasks');

const defaultOptions = {
  buildDir: './dist/out',
  packageDir: './dist/package',
  cleanBuildDir: true,
  cleanPackageDir: true,
  overlays: ['./package/**', './README.md', 'LICENSE'],
  packageFile: './package/package.json',
  buildSequence: null
};

function imprint(gulp, options) {
  const opts = Object.assign({}, defaultOptions, options);

  commonTasks(gulp, opts);
  packageTasks(gulp, opts);
  npmTasks(gulp, opts);
  bumpTasks(gulp, opts);
  releaseTasks(gulp, opts);
}

module.exports = imprint;
