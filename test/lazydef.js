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

    it('Should be enumerable', function () {
        var obj = {};
        var spy = [];
        var k;
        lazyDef(obj, 'test', function () {
            return 42;
        });

        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                spy.push([k, obj[k]]);
            }
        }

        assert.deepEqual(spy, [['test', 42]]);
    });

    it('Should allow redefining', function () {
        var obj = {};
        lazyDef(obj, 'test', function () {
            return 42;
        });

        lazyDef(obj, 'test', function () {
            return 43;
        });

        assert.strictEqual(obj.test, 43);
    });
});
