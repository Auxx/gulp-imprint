'use strict';

const commonTasks = require('./common-tasks');
const packageTasks = require('./package-tasks');

const defaultOptions = {
  buildDir: './dist/out',
  packageDir: './dist/package',
  cleanBuildDir: true,
  cleanPackageDir: true,
  overlays: ['./package/**', './README.md']
};

function imprint(gulp, options) {
  const opts = Object.assign({}, defaultOptions, options);

  commonTasks(gulp, opts);
  packageTasks(gulp, opts);
}

module.exports = imprint;
