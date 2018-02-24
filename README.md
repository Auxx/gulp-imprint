# gulp-imprint

[![npm version](https://badge.fury.io/js/gulp-imprint.svg)](https://badge.fury.io/js/gulp-imprint)

Set of configurable and opinionated [gulp](https://gulpjs.com/) tasks to release and publish nodejs-based apps and libraries.
This set of tasks was designed for complex build and release processes involving many steps as one would have developing
plugins and modules for Angular 2+ framework. gulp-imprint is an overkill for simple libraries.

**WARNING:** gulp-imprint is set to clean build and package output directories before building the project. If you specify your source code directory
as either build or package directory, your source code WILL BE WIPED!

## Installation

`$ npm i gulp-imprint --save-dev`

## Understanding gulp-imprint

To fully understand how gulp-imprint works and why it works this way, it is important to understand some of terminology used in this documentation.

### Glossary

**Bump** - version number increase according to [semver rules](https://semver.org/). Only MAJOR, MINOR and PATCH are supported at the moment.

**Build task** - a task or set of tasks to build/transpile the source code into publishable format.

**Build dir** - directory containing the result of build task.

**Source code** - source code of an application or library, which will be built to become a package.

**Package** - a set of files ready to be uploaded into npm-compatible registry.

**Package dir** - directory containing package.

**Package file** - package.json which will be published as part of package.

**Source package file** - package.json used to describe source code and its dependencies.

**Overlay** - set of static files and directories which will be copied into package dir over build files.

**Release** - a task to bump package version and tag it in git.

**Publish** - a task to publish package into npm-compatible registry.

### Typical workflow

High level workflow includes only three steps: `release`, `package` and `publish`. Here's the breakdown of each step.

#### Release

1. Prepare - gulp-imprint will switch to `master` branch and pull the latest changes.
2. Bump - gulp-imprint will bump package version according to semver rules.
3. Tag - gulp-imprint will commit changes to `package.json` to `master` branch and will create a tag.

#### Package

1. Clean - gulp-imprint will clean both build and package output directories.
2. Build - gulp-imprint will run build task/sequence as defined in its configuration.
3. Prepare - gulp-imprint will copy built files into package directory.
4. Overlay - gulp-imprint will copy over contents of overlay set into package directory.

#### Publish

1. Publish to npm - gulp-imprint will run `$ npm publish` inside package folder.

### Why such workflow?

Publishing complex libraries using transpilers requires additional steps like transpiling, separate dependency management between
source code and resulting package, running tests, adding static files like documentation, etc.
gulp-imprint enforces separation of different layers of application/library to make this process easier to manage.
This set of tasks is also CI friendly as you can use them to automate your workflows.

gulp-imprint itself is using this process to publish itself to npm. Please take a look at project structure
to understand it better.

## Configuration

The following structure describes possible configuration options and their default values:

```javascript
{
  buildDir: './dist/out', // Directory containing transpiled output
  packageDir: './dist/package', // Directory which will contain all the files ready to be pushed to npm registry
  cleanBuildDir: true, // Set to true to clean buildDir before running build task
  cleanPackageDir: true, // Set to true to clean packageDir before running build task
  overlays: ['./package/**', './README.md', 'LICENSE'], // Set of files and directories to overlay into packageDir
  packageFile: './package/package.json', // Location of package.json which will be published as part of npm package 
  buildSequence: null, // Set of gulp tasks to execute as part of build process
  dryRun: false, // gulp-imprint will print out git commands instead of running them if set to true
  commitPrefix: 'Version ' // Prefix for commit messages
};
```

## Skip publishing to npm

If your project should not be published to npm registry (for example, you're building end-user application, not a library)
then run `release` and `package` manually:

```
$ gulp imprint:release:X
$ gulp imprint:package
```

where X is either `major`, `minor` or `patch`.
