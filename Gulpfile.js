'use strict';

var _ = require('lodash-node');
var glob = require('glob');
var path = require('path');
var gulp = require('gulp');

_.forEach(glob.sync('tools/tasks/**/*.js'), function (filename) {
    require(path.resolve(filename)).call(gulp);
});

gulp.task('default', ['cover']);
