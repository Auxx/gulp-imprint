const commonTasks = require('./common-tasks');
const packageTasks = require('./package-tasks');
const npmTasks = require('./npm-tasks');
const bumpTasks = require('./bump-tasks');
const releaseTasks = require('./release-tasks');
const imprintTasks = require('./imprint-tasks');

const defaultOptions = {
  buildDir: './dist/out',
  packageDir: './dist/package',
  cleanBuildDir: true,
  cleanPackageDir: true,
  overlays: ['./package/**', './README.md', 'LICENSE'],
  packageFile: './package/package.json',
  buildSequence: null,
  dryRun: false,
  commitPrefix: 'Version '
};

function imprint(gulp, options) {
  const opts = Object.assign({}, defaultOptions, options);

  commonTasks(gulp, opts);
  packageTasks(gulp, opts);
  npmTasks(gulp, opts);
  bumpTasks(gulp, opts);
  releaseTasks(gulp, opts);
  imprintTasks(gulp, opts);
}

module.exports = imprint;
