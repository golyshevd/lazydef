/*global describe, it*/
'use strict';

var assert = require('assert');

describe('lazydef', function () {
    var lazyDef = require('../lazydef');
    it('Should call getter at once', function (done) {
        var obj = {};
        var spy = [];

        lazyDef(obj, 'foo_bar', function () {
            spy.push(1);

            return 42;
        });

        assert.strictEqual(obj.foo_bar, 42);
        assert.strictEqual(obj.foo_bar, 42);
        assert.strictEqual(obj.foo_bar, 42);
        assert.deepEqual(spy, [1]);

        setTimeout(function () {
            assert.strictEqual(obj.foo_bar, 42);
            assert.strictEqual(obj.foo_bar, 42);
            assert.strictEqual(obj.foo_bar, 42);
            assert.deepEqual(spy, [1]);
            done();
        }, 50);
    });
});
