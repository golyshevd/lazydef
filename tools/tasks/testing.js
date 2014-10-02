'use strict';

var gulpMocha = require('gulp-mocha');
var gulpIstanbul = require('gulp-istanbul');

function gulpMochaPipe() {
    return gulpMocha({
        slow: 1000,
        checkLeaks: true,
        reporter: 'spec'
    });
}

function runCover(done) {
    var self = this;

    this.src([
        'lazydef.js'
    ])
        .pipe(gulpIstanbul())
        .on('finish', function () {
            self.src('test/*.js')
                .pipe(gulpMochaPipe())
                .pipe(gulpIstanbul.writeReports())
                .on('end', done);
        });
}

module.exports = function () {
    this.task('unit', ['lint'], function () {
        return this.src('test/*.js', {read: false}).
            pipe(gulpMochaPipe());
    });

    this.task('test', ['unit']);
    this.task('cover', ['lint'], runCover);
};
