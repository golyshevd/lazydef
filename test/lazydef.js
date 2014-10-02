/*global describe, it*/
'use strict';

var assert = require('assert');

describe('lazydef', function () {
    var lazyDef = require('../lazydef');
    it('Should call getter at once', function (done) {
        var obj = {};
        var spy = [];

        lazyDef(obj, 'fooBar', function () {
            spy.push(1);

            return 42;
        });

        assert.strictEqual(obj.fooBar, 42);
        assert.strictEqual(obj.fooBar, 42);
        assert.strictEqual(obj.fooBar, 42);
        assert.deepEqual(spy, [1]);

        setTimeout(function () {
            assert.strictEqual(obj.fooBar, 42);
            assert.strictEqual(obj.fooBar, 42);
            assert.strictEqual(obj.fooBar, 42);
            assert.deepEqual(spy, [1]);
            done();
        }, 50);
    });

    it('Should allow property setting', function () {
        var obj = {};
        lazyDef(obj, 'fooBar', function () {
            return 42;
        });

        obj.fooBar = 43;
        assert.strictEqual(obj.fooBar, 43);
    });

    it('lazyDef() should return target object', function () {
        var obj = {};
        assert.strictEqual(lazyDef(obj, 'fooBar', function () {
            return 42;
        }), obj);
    });
});
