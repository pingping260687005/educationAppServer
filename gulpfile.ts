import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';

// var gulp = require('gulp'),
//   _ = require('lodash'),
//   { updateRegistry, paths } = require('./gulp/common.js'),
//   browserSync = require('browser-sync'),
//   middleware = require('./gulp/proxy'),
//   defaultAssets = require('./config/assets/default'),
//   gulpLoadPlugins = require('gulp-load-plugins'),
//   plugins = gulpLoadPlugins({
//     rename: {
//       'gulp-angular-templatecache': 'templateCache'
//     }
//   });
// Nodemon task
gulp.task('nodemon', () => {
  return nodemon({
    script: 'build/server.js',
    nodeArgs: ['--inspect'],
    args: ['--max-old-space-size=8192'],
    ext: 'js,html',
    verbose: true,
    watch: ['build/*.js']
  });
});
